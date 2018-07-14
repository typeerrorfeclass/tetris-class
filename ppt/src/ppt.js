import React from 'react'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom'
// import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Catalog from './component/Catalog'
import Page from './component/Page'
import Box from './component/Box'
import image0 from './img/prototype.png'
import image1 from './img/mvc.jpg'
import image2 from './img/twoway.png'
import image3 from './img/twoway.png'
import image4 from './img/event-driven.png'
import image5 from './img/data-driven.png'

export default class PPT extends React.Component {
  static get displayName() {
    return 'PPT'
  }

  componentDidMount() {
    this.onKeyDown_ = this.onKeyDown.bind(this)
    document.addEventListener('keydown', this.onKeyDown_)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown_)
    this.onKeyDown_ = null
  }

  onKeyDown(evt) {
    const code = evt.code.toLowerCase()

    if (code === 'space' || code === 'arrowright' || code === 'arrowdown') {
      this.goNext()
    } else if (code === 'arrowleft' || code === 'arrowup') {
      this.goPrev()
    }
  }

  goNext() {
    let currIndex = parseInt(window.location.hash.replace('#/', ''))
    if (isNaN(currIndex)) {
      currIndex = -1
    }

    if (currIndex >= 9 - 1) {
      return
    }

    this.router_.history.push('/' + (currIndex + 1))
  }

  goPrev() {
    let currIndex = parseInt(window.location.hash.replace('#/', ''))
    if (isNaN(currIndex)) {
      currIndex = 1
    }

    if (currIndex === 0) {
      return
    }

    this.router_.history.push('/' + (currIndex - 1))
  }

  render() {
    return (
      <div className="ppt">
        <Router
          ref={c => {
            this.router_ = c
          }}>
          <div className="pages">
            <Catalog
              items={[
                '首页',
                'TypeError课程介绍',
                '课程内容',
                '未命名',
                '俄罗斯方块到底是个什么游戏？',
                '俄罗斯方块比“电商购物车”好在哪？',
                '未命名',
                '前端MVC',
                '事件驱动 VS 数据驱动'
              ]}
            />
            <Page pageIndex={0}>
              <Box data={{ className: 'cover' }}>
                <h1 id="-">编程实践 - 俄罗斯方块</h1>
                <h4 id="-typeerror">方怀南@TypeError</h4>
              </Box>
            </Page>
            <Page pageIndex={1}>
              <h2 id="typeerror-">TypeError课程介绍</h2>
              <p>
                TypeError前端直播室是一个线上前端技术培训项目,
                目前和专业培训机构合作打造课程.
              </p>
              <p>获取详细信息请扫码加微信.</p>
              <h3 id="-">访问地址</h3>
              <ul>
                <li>
                  主页:{' '}
                  <a href="https://typeerrorfeclass.github.io">
                    typeerrorfeclass.github.io
                  </a>
                </li>
                <li>
                  直播:{' '}
                  <a href="https://www.yy.com/34592948/34592948">
                    YY直播间34592948
                  </a>
                </li>
                <li>
                  github:{' '}
                  <a href="https://github.com/typeerrorfeclass">
                    @typeerrorfeclass
                  </a>
                </li>
              </ul>
              <h3 id="-">微信扫码</h3>
              <p>
                <img
                  src="https://typeerrorfeclass.github.io/assets/wechat.png"
                  alt="微信二维码"
                />
              </p>
            </Page>
            <Page pageIndex={2}>
              <h2 id="-">课程内容</h2>
              <p>使用前端技术栈，从头到尾编写一个俄罗斯方块小游戏。</p>
              <h3 id="-">涉及环节</h3>
              <ul>
                <li>需求分析</li>
                <li>方案设计</li>
                <li>程序编码</li>
              </ul>
            </Page>
            <Page pageIndex={3}>
              <Box data={{ className: 'cover' }}>
                <h1 id="-">需求分析</h1>
              </Box>
            </Page>
            <Page pageIndex={4}>
              <h2 id="-">俄罗斯方块到底是个什么游戏？</h2>
              <h3 id="-">俄罗斯方块的要素</h3>
              <ul>
                <li>界面展示</li>
                <li>定时刷新</li>
                <li>键盘响应</li>
                <li>方块模型</li>
                <li>游戏规则</li>
              </ul>
              <h3 id="-">案例图</h3>
              <div className="plugin-image">
                <img src={image0} />
              </div>
            </Page>
            <Page pageIndex={5}>
              <h2 id="-">俄罗斯方块比“电商购物车”好在哪？</h2>
              <ul>
                <li>业务比较简单，人人都了解，不需要过多前置知识</li>
                <li>技术栈比较单纯，不需要使用过多工具</li>
                <li>本身的复杂性高于“购物车”</li>
                <li>可以在成品的基础上进行技术演进，过渡到前端框架</li>
              </ul>
              <h3 id="-">重点</h3>
              <p>
                重点不在于写出一个俄罗斯方块(任何人动动脑筋都可以做到), 而在于:
              </p>
              <ul>
                <li>通过代码熟悉已经学过的es6语法的使用</li>
                <li>通过代码掌握前端单页应用的设计套路(MVC)</li>
              </ul>
            </Page>
            <Page pageIndex={6}>
              <Box data={{ className: 'cover' }}>
                <h1 id="-">方案设计</h1>
              </Box>
            </Page>
            <Page pageIndex={7}>
              <h2 id="-mvc">前端MVC</h2>
              <h3 id="-">架构图</h3>
              <div className="plugin-image">
                <img src={image1} />
              </div>
              <h3 id="mvc-">MVC分别是什么？</h3>
              <ul>
                <li>
                  M: model, 负责存储数据,
                  以及实现数据之间的驱动关系(业务逻辑)的模块
                </li>
                <li>V: view, 负责展示数据, 接收用户交互事件的模块</li>
                <li>
                  C: controller,
                  负责衔接M和V的模块——将model数据转换成view可以辨认使用的数据,
                  将用户交互事件转换成model可以理解的业务事件的模块
                </li>
              </ul>
              <h3 id="mvc-">MVC的本质</h3>
              <p>
                分层设计, 各司其职, 将M驱动V和V驱动M这两条信息通道隔离开,
                简化代码实现.
              </p>
              <div className="plugin-image">
                <img src={image2} />
              </div>
              <h3 id="-mvc-">前端MVC的特点</h3>
              <p>
                controller经常分散或者隐藏在其他模块中(document-view模式、MVVM模式……).
              </p>
            </Page>
            <Page pageIndex={8}>
              <h2 id="-vs-">事件驱动 VS 数据驱动</h2>
              <h3 id="-">再回味一下两条信息通道</h3>
              <div className="plugin-image">
                <img src={image3} />
              </div>
              <p>事件驱动和数据驱动主要是指黑色箭头组成的通道的实现方式.</p>
              <h3 id="-">事件驱动</h3>
              <div className="plugin-image">
                <img src={image4} />
              </div>
              <h4 id="-">优点</h4>
              <ul>
                <li>灵活、自由</li>
                <li>减小view层的渲染负担</li>
              </ul>
              <h4 id="-">缺点</h4>
              <ul>
                <li>代码复杂、不易维护</li>
                <li>事件爆炸</li>
              </ul>
              <h3 id="-">数据驱动</h3>
              <div className="plugin-image">
                <img src={image5} />
              </div>
              <h4 id="-">优点</h4>
              <ul>
                <li>
                  不需要关注细节, 实现成本低,
                  易维护(同样的脑力可以写出更复杂的应用)
                </li>
              </ul>
              <h4 id="-">缺点</h4>
              <ul>
                <li>对view层的渲染性能要求比较高</li>
                <li>
                  数据对应状态, 事件对应过程,
                  使用数据驱动实现动画等过程比较不直观
                </li>
              </ul>
              <h3 id="-">结论</h3>
              <p>99.9%的情况下你压根不应该考虑使用事件驱动模型, 忘记它.</p>
            </Page>
            <Route exact path="/" render={_ => <Redirect to={'/0'} />} />
          </div>
        </Router>
      </div>
    )
  }
}
