@catalog

@page

@box({"className": "cover"})
# 编程实践 - 俄罗斯方块
#### 方怀南@TypeError
@boxEnd

@page

## TypeError课程介绍

TypeError前端直播室是一个线上前端技术培训项目, 目前和专业培训机构合作打造课程.

获取详细信息请扫码加微信.

### 访问地址

* 主页: [typeerrorfeclass.github.io](https://typeerrorfeclass.github.io)
* 直播: [YY直播间34592948](https://www.yy.com/34592948/34592948)
* github: [@typeerrorfeclass](https://github.com/typeerrorfeclass)

### 微信扫码

![微信二维码](https://typeerrorfeclass.github.io/assets/wechat.png)

@page

## 课程内容

使用前端技术栈，从头到尾编写一个俄罗斯方块小游戏。

### 涉及环节

* 需求分析
* 方案设计
* 程序编码

@page

@box({"className": "cover"})
# 需求分析
@boxEnd

@page

## 俄罗斯方块到底是个什么游戏？

### 俄罗斯方块的要素

* 界面展示
* 定时刷新
* 键盘响应
* 方块模型
* 游戏规则

### 案例图

@image(./img/prototype.png)

@page

## 俄罗斯方块比“电商购物车”好在哪？

* 业务比较简单，人人都了解，不需要过多前置知识
* 技术栈比较单纯，不需要使用过多工具
* 本身的复杂性高于“购物车”
* 可以在成品的基础上进行技术演进，过渡到前端框架

### 重点

重点不在于写出一个俄罗斯方块(任何人动动脑筋都可以做到), 而在于:

* 通过代码熟悉已经学过的es6语法的使用
* 通过代码掌握前端单页应用的设计套路(MVC)

@page

@box({"className": "cover"})
# 方案设计
@boxEnd

@page

## 前端MVC

### 架构图

@image(./img/mvc.jpg)

### MVC分别是什么？

* M: model, 负责存储数据, 以及实现数据之间的驱动关系(业务逻辑)的模块
* V: view, 负责展示数据, 接收用户交互事件的模块
* C: controller, 负责衔接M和V的模块——将model数据转换成view可以辨认使用的数据, 将用户交互事件转换成model可以理解的业务事件的模块

### MVC的本质

分层设计, 各司其职, 将M驱动V和V驱动M这两条信息通道隔离开, 简化代码实现.

@image(./img/twoway.png)

### 前端MVC的特点

controller经常分散或者隐藏在其他模块中(document-view模式、MVVM模式……).

@page

## 事件驱动 VS 数据驱动

### 再回味一下两条信息通道

@image(./img/twoway.png)

事件驱动和数据驱动主要是指黑色箭头组成的通道的实现方式.

### 事件驱动

@image(./img/event-driven.png)

#### 优点

* 灵活、自由
* 减小view层的渲染负担

#### 缺点

* 代码复杂、不易维护
* 事件爆炸

### 数据驱动

@image(./img/data-driven.png)

#### 优点

* 不需要关注细节, 实现成本低, 易维护(同样的脑力可以写出更复杂的应用)

#### 缺点

* 对view层的渲染性能要求比较高
* 数据对应状态, 事件对应过程, 使用数据驱动实现动画等过程比较不直观

### 结论

99.9%的情况下你压根不应该考虑使用事件驱动模型, 忘记它.











