#!/usr/bin/env python
# coding:utf-8

import sys 
import traceback
import json
import os
import time 
import getopt
import urllib
from urllib.parse import urlparse
from urllib.request import urlretrieve
import codecs
import socket
import gzip
from io import StringIO
import concurrent.futures

socket.setdefaulttimeout(300)

contents = []

def getContents(contents, n):
    if 'content' in n:
        c = n['content']
        if 'url' in c or 'uri' in c:
            contents.append(c.get('url', c.get('uri')))

    if 'children' in n:
        children = n['children']
        for i in range(len(children)):
            c = children[i]
            getContents(contents,c)
    
    return

def gzdecode(data):  
    compressedStream = StringIO(data)  
    gziper = gzip.GzipFile(fileobj=compressedStream)    
    data2 = gziper.read()  

    return data2 

def autoDownLoad(args):
    
    url, add = args
    
    try:
        a, b = urlretrieve(url, add)
        keyMap = dict(b)
        if 'content-encoding' in keyMap and keyMap['content-encoding'] == 'gzip':
            objectFile = open(add, 'rb+')
            data = objectFile.read()
            data = gzdecode(data)
            objectFile.seek(0, 0)
            objectFile.write(data)
            objectFile.close()

        return True
  
    except Exception as e:
        print(f'Error occurred while downloading {url}. Error: {e}')
        return False


if __name__ == "__main__":

    baseurl = ''
    savedir = ''
    start = 0

    try:
        opts, args = getopt.getopt(sys.argv[1:], "hu:d:s:", ["url=","dir=","start="])
    except getopt.GetoptError:
        print('Parameter error. Usage: python downloader.py -u <url> -d <directory> -s <start_index>')
        sys.exit(2)

    for opt, arg in opts:
        if opt == '-h':
            print('Usage: python downloader.py -u <url> -d <directory> -s <start_index>')
            sys.exit()
        elif opt in ("-u", "--url"):
            baseurl = arg
        elif opt in ("-d", "--dir"):
            savedir = arg
        elif opt in ("-s", "--start"):
            start = int(arg)

    if baseurl == '':
        print('Please provide the URL parameter.')
        sys.exit(2)
    if savedir == '':
        print('Please provide the directory parameter.')
        sys.exit(2)

    if os.path.isfile(savedir):
        print(f'Savedir "{savedir}" cannot be a file.')
        sys.exit(2)

    if not os.path.exists(savedir):
        os.makedirs(savedir)

    uu = urlparse(baseurl)
    tileseturl = uu.scheme + "://" + uu.netloc  + uu.path
    if not tileseturl.endswith('tileset.json'):
        tileseturl +=  '/tileset.json'

    baseurl = tileseturl[0:tileseturl.find('tileset.json')]

    tileseturl += '?' + uu.query

    print('tileseturl',tileseturl)

    opener = urllib.request.build_opener()
    opener.addheaders = [('User-Agent', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36 SE 2.X MetaSr 1.0')]

    tilesetfile = savedir+'/tileset.json'
    if not autoDownLoad((tileseturl, tilesetfile)):
        sys.exit(2)

    print('Downloaded tileset.json successfully.')

    tileset = None
    try:
        f = codecs.open(tilesetfile,'r','utf-8')
        s = f.read()
        f.close()

        tileset = json.loads(s)
    except Exception as e:
        print(f'Error occurred while parsing tileset file. Error: {e}')

    getContents(contents,tileset['root'])

    print('Found the following contents to download:', contents)

    args_list = []
    for c in contents:
        if uu.query:
            url = baseurl + c + '?' + uu.query
        else:
            url = baseurl + c
            
        filename = f'/{c}'
        filepath = savedir + filename
        dirname =  os.path.dirname(filepath)
        if not os.path.exists(dirname):
            os.makedirs(dirname) 
        
        args_list.append((url, filepath))

    args_list = args_list[start:]
    print('\nargs_list',args_list)

    with concurrent.futures.ThreadPoolExecutor() as executor:
        results = list(executor.map(autoDownLoad, args_list))

    success_count = len([r for r in results if r is True])
    failure_count = len(results) - success_count

    print(f'Downloaded {success_count}/{len(contents)} files successfully. Failed to download {failure_count} files.')

""" 
不支持可下载external tilesets（我称之为层级tilesets）

用chatgpt改造3dtiles_downloader.py为多线程下载

python 3dtiles_downloader_multithread.py -u http://211.149.185.229:8081/data/country_build/chengdu_ajust_clip/tileset.json -d D:\Desktop\3ddd
"""