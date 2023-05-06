# xt3d-local-debug

[基础实例|xt3d](http://211.149.185.229:8080/basiccategorylist)

[高级应用|xt3d](http://211.149.185.229:8080/advancedlist)

[xt3d 开发文档](http://42.192.134.169:8090/xt3dapi/index.html)

## 运行

`npm i serve -g`
在根目录执行 `serve`
访问
![image](https://user-images.githubusercontent.com/20126997/236159777-2d9687b3-77be-447b-9b6e-a5b530de4e17.png)

## xt3d 基础实例v2.0 功能清单

```
基础底图
      1.百度地图（偏移）
      2.百度地图（无偏移）
      3.ArcGIS在线底图
      4.MapBox在线底图
      5.高德在线底图
      6.天地图在线底图
      7.超图在线底图
      8.本地单张图片
      9.本地影像（离线）
      10.底图参数
地形叠加
      11.中国地形
      12.ArcGIS地形
      13.局部地形（本地）
      14.地形夸张
点状对象
      15.Cesium点聚合1
      16.Cesium点聚合2
      17.Cesium点聚合3
      18.Cesium点聚合4
      19.Cesium点聚合5
      20.Billboard加载Gif图片
      21.Cesium 闪烁点
      22.Primitives加载大量图标点
      23.div文本点
      24.热点面板文本
      25.图标点+文字(primitive方式)
      26.动态文本标记
      27.图片+canvas画图billboard文字动画
      28.简单标注
      29.简单渐变标注
      30.竖立文本标注
      31.弹跳点动画（billboard）
      32.水球图
      33.浮动点
线状对象
      34.动态线
      35.迁徙线效果
      36.光晕线
      37.动态传输线
      38.地球拓扑
      39.尾迹线
      40.发光线（材质）
      41.北京公交线路（entity+自定义材质）
      42.北京公交线路（primitive+自定义材质）
      43.管道流动
      44.精灵线
      45.飞线
      46.绕圈巡航
      47.动态轨迹线
      48.流动材质应用
      49.超级线
      50.水系效果
面状对象
      51.区域渐变
      52.区域标注
      53.动态水面
      54.热力图
      55.绘制反选遮罩
圆形对象
      56.雷达扫描
      57.扩散圆1
      58.波纹圆
      59.扩散圆2
      60.六边形扩散
      61.扇形扫描
墙体对象
      62.普通动态墙
      63.高级动态墙
      64.规则墙
      65.圆形墙
      66.扩散墙
      67.圆形扩散墙(Primitive)
      68.边界围栏
      69.锯齿围栏
球体对象
      70.电弧穹顶
      71.扫描穹顶
      72.球体材质
单体化
      73.倾斜模型分栋单体化（基于geoserver）含教程
      74.倾斜模型分层单体化（基于geoserver）含教程
      75.倾斜模型分户单体化（基于geoserver）含教程
GeoServer查询
      76.面查点
      77.点查面
      78.属性查询
自定义信息框
      79.多字段自适应信息框
      80.气泡窗口样式1
      81.气泡窗口样式2
      82.设备状态窗口
      83.leaflet风格弹窗
标注标绘
      84.点线面绘制
      85.点线面编辑
      86.点线面绘制扩展
      87.点线面编辑扩展
      88.军事标绘绘制
      89.军事标绘编辑
      90.自定义html标注（含编辑）
      91.体对象标绘
      92.行政区标注
      93.文字贴图（含编辑）
      94.LED文本
点对象动态位置
      95.模型
      96.图标
      97.标签
统计图表
      98.堆叠图形
      99.柱状人口统计（动画）
      100.图表窗口
轨迹漫游
      101.轨迹回放
      102.跟随视角漫游
      103.第一人称漫游
      104.上帝视角漫游
      105.行人漫游
3DTileset模型
      106.裁剪
      107.编辑（参数）
      108.编辑（交互）
      109.部分可见
      110.模型热力图
矢量白膜特效
      111.矢量白膜自定义shader
      112.矢量白膜自定义shader（透明）
      113.矢量白膜特效选中高亮
      114.立体建筑物闪烁效果
      115.建筑物渐变（Primitive）
      116.城市建筑白模
      117.旋转椎体
      118.颜色调试
空间分析
      119.限高分析
      120.通视分析
      121.可视域分析
      122.可视域分析2
      123.天际线描边
      124.缓冲区分析
开挖效果
      125.地表开挖（材质贴图）
      126.地形开挖（材质贴图）
      127.矿区岩层效果
粒子系统
      128.火焰粒子
      129.喷泉粒子
      130.烟雾粒子
      131.火点
场景工具
      132.测量工具
      133.位置拾取工具
卫星场景对象
      134.追踪圆锥体
      135.追踪四锥体
      136.雷达遮罩扫描
      137.扇叶扫描
      138.雷达放射波
      139.卫星视椎体（四棱锥体）
      140.目标跟踪
      141.动态目标检测
      142.扇形扫描
      143.扇形扫描扩展
      144.行驶方向
      145.卫星正摄动画
      146.相控阵雷达范围
GLTF模型编辑控制
      147.gltf标绘绘制
      148.gltf标绘编辑
      149.模型展开动画
      150.模型自旋转
视频应用
      151.视频贴图参数调整
      152.视频融合
      153.视频窗口（普通视频）
      154.视频窗口（rtmp视频）
      155.视频窗口（hls视频）
      156.视频墙（含编辑）
      157.视频融合（Hls协议）
      158.视频投射
水利水域
      159.动态水域
      160.水闸放水效果
      161.淹没效果
      162.动态河流
电力设施
      163.电塔点
      164.高压线（自动计算线）
      165.高压线（自动计算方向）
场景控制
      166.场景出图（导出图片）
      167.自定义天空盒
      168.自定义空间背景
      169.场景泛光
      170.雨雪雾天气效果
      171.云层
      172.纯色地球
      173.昼夜
      174.地表透明（地下模式）
      175.二三维联动（基于openlayers)
      176.鼠标按下效果
      177.界面蒙板
      178.对象描边
      179.夜视效果
      180.黑白效果
      181.马赛克效果
      182.景深效果
场景控件
      183.位置信息状态栏控件
      184.导航控件
      185.Tooltip鼠标移入信息
      186.鹰眼地图（基于openlayers）
      187.地图卷帘对比
      188.双屏对比
      189.加载遮罩
相机及视角
      190.开场动画
      191.限定视角范围
      192.书签管理
      193.旋转的地球
      194.绕点旋转
      195.原地四周旋转
      196.视角中心点
      197.相机视角参数拾取
键盘控制
      198.视角控制
      199.模型控制
      200.第一视角
      201.第一视角（高度拾取）
Echarts可视化支持
      202.Echarts 迁徙图1
      203.Echarts 迁徙图2
      204.Echarts 迁徙图3
      205.Echarts 散点图
      206.Echarts 流入线
      207.Echarts 流出线
MapV可视化支持
      208.MapV 迁徙图
      209.MapV 大迁徙图
      210.MapV 热力图
      211.MapV 强边界图
      212.MapV 蜂巢图
      213.MapV 方格图
高级组件
      214.动态效果点
      215.光柱椎体
      216.扫描线
      217.立体墙呼吸灯
      218.旋转刻度盘
      219.发光柱体
      220.光柱椎体（粒子效果）
第三方类库支持
      221.火星科技
      222.西部世界
      223.恒歌科技

```
