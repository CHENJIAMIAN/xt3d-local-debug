const fs = require('fs');
const path = require('path');

const b3dmFilePath = `D:/Desktop/xt3d-211.149.185.229/211.149.185.2298081/data/house3dtiles/house/0/0/0.b3dm`;
// 定义输出的GLB文件路径为输入的b3dm文件所在目录下的output.glb文件
const outputGlbFilePath = path.join(path.dirname(b3dmFilePath), 'output.glb');

// 读取b3dm文件
fs.readFile(b3dmFilePath, (err, filebuffer) => {
  if (err) { // 如果出现错误，则打印错误信息并返回
    console.error('Error reading b3dm file:', err);
    return;
  }

  // 从文件缓冲区中读取文件头部信息
  const _headstr = filebuffer.toString('utf8', 0, 4); // 文件类型，一般为'b3dm'
  const _version = filebuffer.readUInt32LE(4); // 文件版本号，占据4个字节
  const _bytelen = filebuffer.readUInt32LE(8); // 文件总长度，包括文件头和所有数据部分
  const _featureTableJSONByteLength = filebuffer.readUInt32LE(12); // JSON格式的特征表的字节长度
  const _featureTableBinaryByteLength = filebuffer.readUInt32LE(16); // 二进制格式的特征表的字节长度
  const _batchTableJSONByteLength = filebuffer.readUInt32LE(20); // JSON格式的批处理表的字节长度
  const _batchTableBinaryByteLength = filebuffer.readUInt32LE(24); // 二进制格式的批处理表的字节长度

  /* 
  在 b3dm 文件中，头部信息占据了前28个字节，分别是：
    文件类型（4个字节）
    版本（4个字节）
    文件总长度（4个字节）
    特征表的JSON格式长度（4个字节）
    特征表的二进制格式长度（4个字节）
    批处理表的JSON格式长度（4个字节）
    批处理表的二进制格式长度（4个字节）
  */
  // 计算GLB数据的起始位置和长度
  const glbStartIndex = 28 + _featureTableJSONByteLength + _featureTableBinaryByteLength + _batchTableJSONByteLength + _batchTableBinaryByteLength;
  const glbBuffer = filebuffer.slice(glbStartIndex); // 从glb数据的起始位置开始，读取所有剩余的字节

  // 将GLB数据写入文件中
  fs.writeFile(outputGlbFilePath, glbBuffer, (err) => {
    if (err) { // 如果出现错误，则打印错误信息并返回
      console.error('Error writing glb file:', err);
      return;
    }
    console.log('Glb file extracted and saved as:', outputGlbFilePath); // 成功写入后，在控制台输出保存的文件路径
  });
});
