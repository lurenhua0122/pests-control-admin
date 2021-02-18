# 有害生物防治定位管理系统

​ 厦门奇特信息科技有限公司

​ 2021 年 1 月 8 日

| 内容                 | 版本 | 作者   | 日期       |
| -------------------- | ---- | ------ | ---------- |
| 初始化版本           | 0.1  | 鲁仁华 | 2020-10-12 |
| 增加警卫任务         | 0.5  | 罗莉   | 2020-11-15 |
| 增加单本手控         | 0.6  | 鲁仁华 | 2020-12-30 |
| 增加系统功能         | 0.7  | 鲁仁华 | 2021-1-1   |
| 修改图片大小         | 1.0  | 罗莉   | 2021-1-11  |
| 增加服务器地址       | 1.1  | 罗莉   | 2021-1-18  |
| 增加经纬度设置       | 1.2  | 罗莉   | 2021-1-21  |
| 修改警卫任务删除方式 | 1.3  | 鲁仁华 | 2021-1-27  |

### 一、简介

#### 1.1 目的

对信号系统的组成部分简要说明；
对软件操作进行详细的说明；
用户通过本说明书掌握对软件的操作。

#### 1.2 适用范围

软件使用者，系统管理员，开发人员以及项目实施人员、维护人员等。

#### 1.3 术语定义

安卓 APP：完成业务操作，包括扫码、登记、拍照、数据上传等操作。

服务端：业务数据存储及接口服务。

防治业务类型：包括 诱木 、砍倒的树 、诱捕器 。

树径：包括 10cm 以下、10-20cm、21-30cm、31-40cm、41cm 以上；15、19、23、25、21。

袋数：1/4 、 1/3 、 1/2 、1 、2、3、4、5、5 以上。

### 二、产品组成说明

#### 2.1 后台产品

​ 整个系统由多个子系统组成，是集成服务管理，业务数据，权限管理等多个业务子系统的集成管理平台。基于 GIS 操作，各业务子系统接口协议数据交换格式已经标准化，可方便地接入不同应用系统，实现数据共享和系统联动控制功能，提供统一的接口使用界面。

#### 2.2 前端产品

前端产品便是 APP 系统，主要基于安卓操作系统，能够将车载定位的数据上传到前端平台。

### 三、系统设计

#### 3.1 限制与约束

每个项目都存在一定的限制和约束，在本项目中存在以下几点的限制和约束：
1、项目中有 GPS 定位子系统，所以我们的地图文件必需是 wgs84 地图，以经纬度来确定坐标系统的地图数据文档
2、其它子系统的接口开发，限制了管控平台的开发进度
3、交通设施管理，可将提供路口渠化图文件存入数据库与标记点发生关联，这里主要是地图信息采集时的工作。

### 四、系统功能说明

#### 4.1 系统介绍

![](https://aiton.oss-cn-beijing.aliyuncs.com/pests/app/flow.png).

#### 4.2 前端操作

##### 4.2.1 任务流程

任务的流程图

![](https://aiton.oss-cn-beijing.aliyuncs.com/pests/app/%E7%BB%98%E5%9B%BE5.jpg)

##### 4.2.2 打开 APP 程序

登陆界面

<img src="https://aiton.oss-cn-beijing.aliyuncs.com/pests/app/Snipaste_2021-02-10_17-55-24.png" alt="Snipaste_2021-02-10_17-55-24" style="zoom: 80%;" />.<img src="https://aiton.oss-cn-beijing.aliyuncs.com/pests/app/Snipaste_2021-02-10_17-56-21.png" alt="Snipaste_2021-02-10_17-56-21" style="zoom: 80%;" />

##### 4.2.3 主界面

<img src="https://aiton.oss-cn-beijing.aliyuncs.com/pests/app/Snipaste_2021-02-10_20-47-15.png" alt="Snipaste_2021-02-10_20-47-15" style="zoom: 80%;" />.<img src="https://aiton.oss-cn-beijing.aliyuncs.com/pests/app/Snipaste_2021-02-10_20-48-51.png" alt="Snipaste_2021-02-10_20-48-51" style="zoom: 80%;" />

<img src="https://aiton.oss-cn-beijing.aliyuncs.com/pests/app/Snipaste_2021-02-10_20-51-09.png" alt="Snipaste_2021-02-10_20-51-09" style="zoom:80%;" />.<img src="https://aiton.oss-cn-beijing.aliyuncs.com/pests/app/Snipaste_2021-02-10_20-51-25.png" alt="Snipaste_2021-02-10_20-51-25" style="zoom:80%;" />

<img src="https://aiton.oss-cn-beijing.aliyuncs.com/pests/app/Snipaste_2021-02-10_20-51-46.png" alt="Snipaste_2021-02-10_20-51-46" style="zoom:80%;" />.<img src="https://aiton.oss-cn-beijing.aliyuncs.com/pests/app/Snipaste_2021-02-10_20-53-12.png" alt="Snipaste_2021-02-10_20-53-12" style="zoom:80%;" />

##### 4.2.4 菜单界面

<img src="https://aiton.oss-cn-beijing.aliyuncs.com/pests/app/Snipaste_2021-02-11_20-58-55.png" alt="Snipaste_2021-02-11_20-58-55" style="zoom:80%;" />.

##### 4.2.5 加载离线地图

<img src="https://aiton.oss-cn-beijing.aliyuncs.com/pests/app/Snipaste_2021-02-10_20-53-25.png" alt="Snipaste_2021-02-10_20-53-25" style="zoom:80%;" />.<img src="https://aiton.oss-cn-beijing.aliyuncs.com/pests/app/Snipaste_2021-02-10_20-53-34.png" alt="Snipaste_2021-02-10_20-53-34" style="zoom:80%;" />

##### 4.2.6 加载地图底图

![Snipaste_2021-02-10_20-53-34](https://aiton.oss-cn-beijing.aliyuncs.com/pests/app/Snipaste_2021-02-10_20-53-34.png).

##### 4.2.7 上传数据服务

![Snipaste_2021-02-11_20-58-55](https://aiton.oss-cn-beijing.aliyuncs.com/pests/app/Snipaste_2021-02-11_20-58-55.png).

##### 4.2.8 我的设置

![Snipaste_2021-02-10_20-53-57](https://aiton.oss-cn-beijing.aliyuncs.com/pests/app/Snipaste_2021-02-10_20-53-57.png).

#### 4.3 后台操作

##### 4.3.1 登陆界面

![Snipaste_2021-02-09_17-46-59](https://aiton.oss-cn-beijing.aliyuncs.com/pests/admin/Snipaste_2021-02-09_17-46-59.png)

##### 4.3.2 主界面

主要显示的内容当前登陆用户的相关信息。包括登陆 ID，登陆的手机号，登陆人员的性别，登陆的名字，登陆用户的名称，登陆用户头像。

![Snipaste_2021-02-09_18-10-14](https://aiton.oss-cn-beijing.aliyuncs.com/pests/admin/Snipaste_2021-02-09_18-10-14.png)

##### 4.3.3 防治界面

###### 4.3.3.1 防治地图界面

打开有害防治的第一个界面，是以地图的方式进行显示。橘黄色的点表示有害防治数据显示

![Snipaste_2021-02-09_20-07-26](https://aiton.oss-cn-beijing.aliyuncs.com/pests/admin/Snipaste_2021-02-09_20-07-26.png)

地图缩小显示，可以显示到指定的地区；

![Snipaste_2021-02-09_18-11-44](https://aiton.oss-cn-beijing.aliyuncs.com/pests/admin/Snipaste_2021-02-09_18-11-44.png)

###### 4.3.3.2 定位工作区域

显示工作区域，找到有橘黄色点。并进行地图放大显示操作，定位到显示的地方。

![Snipaste_2021-02-09_18-11-57](https://aiton.oss-cn-beijing.aliyuncs.com/pests/admin/Snipaste_2021-02-09_18-11-57.png)

以下图显示了两个有害防治数据信息

![Snipaste_2021-02-09_18-12-07](https://aiton.oss-cn-beijing.aliyuncs.com/pests/admin/Snipaste_2021-02-09_18-12-07.png)

###### 4.3.3.3 打开采集数据

点击地图上某个防治数据，可以弹出窗口显示详细的防治数据信息；

![Snipaste_2021-02-09_18-12-21](https://aiton.oss-cn-beijing.aliyuncs.com/pests/admin/Snipaste_2021-02-09_18-12-21.png)

###### 4.3.3.4 扩大显示数据

放大显示防治数据，可以在侧边显示防治数据，并放大到一定程度进行显示。不建议进行更加在的显示；

![Snipaste_2021-02-09_18-12-33](https://aiton.oss-cn-beijing.aliyuncs.com/pests/admin/Snipaste_2021-02-09_18-12-33.png)

###### 4.3.3.5 防治列表界面

以列表的方式显示有害防治数据，这样可以按时间段的方式进行数据的显示；

![Snipaste_2021-02-09_18-10-53](https://aiton.oss-cn-beijing.aliyuncs.com/pests/admin/Snipaste_2021-02-09_18-10-53.png)

###### 4.3.3.6 修改防治数据

可以进行防治数据进行修改，可以对防治数据的定位误差进行修改。以实际现场进行定位查找；

![Snipaste_2021-02-09_18-13-10](https://aiton.oss-cn-beijing.aliyuncs.com/pests/admin/Snipaste_2021-02-09_18-13-10.png)

###### ~~4.3.3.7 删除防治数据~~

在 1.2 版本中，对防治数据进行删除的操作已经取消；

![Snipaste_2021-02-09_18-13-18](https://aiton.oss-cn-beijing.aliyuncs.com/pests/admin/Snipaste_2021-02-09_18-13-18.png)

##### 4.3.4 二维码管理

###### 4.3.4.1 列表管理

显示生成的二维码，可以对二维码进行操作；

![Snipaste_2021-02-09_18-13-26](https://aiton.oss-cn-beijing.aliyuncs.com/pests/admin/Snipaste_2021-02-09_18-13-26.png)

查询指定时间段生成的二维码数据；

![Snipaste_2021-02-09_18-14-00](https://aiton.oss-cn-beijing.aliyuncs.com/pests/admin/Snipaste_2021-02-09_18-14-00.png)

###### 4.3.4.2 编号过滤查询

根据编号后六位唯一标识进行查询。数据记录集理论达到无限数据量，根据唯一标识生成规则，必需要生成 32 位的唯一值；方便以后进行扩展，不过在过滤查询和“二维码标识”上，只显示后六位。

![Snipaste_2021-02-09_18-14-43](https://aiton.oss-cn-beijing.aliyuncs.com/pests/admin/Snipaste_2021-02-09_18-14-43.png)

###### 4.3.4.3 二维码增加

对二维码进行增加，这里建议使用生成一条记录按钮；

![Snipaste_2021-02-09_18-14-51](https://aiton.oss-cn-beijing.aliyuncs.com/pests/admin/Snipaste_2021-02-09_18-14-51.png)

##### 4.3.5 项目列表

方便以后可以在不同地方的使用，快递形成多地方业务使用；可以创建多个项目并关联到本用户

![Snipaste_2021-02-09_18-14-58](https://aiton.oss-cn-beijing.aliyuncs.com/pests/admin/project.png)

##### 4.3.6 当前用户

显示当前登陆用户，并可以进行修改；App 端不进行修改操作；

![Snipaste_2021-02-09_18-15-05](https://aiton.oss-cn-beijing.aliyuncs.com/pests/admin/me1.png)

##### 4.3.7 退出登陆

可以进行退出登陆操作；

![](https://aiton.oss-cn-beijing.aliyuncs.com/pests/admin/logout.png)

### 五、 设备要求

| 序号 | 名称     | 规格                                       |
| ---- | -------- | ------------------------------------------ |
| 1    | ARM      | 麒麟 881 以上                              |
| 2    | 储存     | 64G                                        |
| 3    | 运行内存 | 6G                                         |
| 4    | android  | 10.0 以上的版本，2018 年以后出的手机都支持 |

| 序号 | 名称     | 规格                                         |
| ---- | -------- | -------------------------------------------- |
| 1    | CPU      | I5 3.6 以上                                  |
| 2    | 内存     | 8G 以上                                      |
| 3    | 硬盘     | 500G 以上                                    |
| 4    | 操作系统 | Window10 及以上，MacOS10.12 以上 采用 Chrome |
