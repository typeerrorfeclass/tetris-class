import React from 'react'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom'
// import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Catalog from './component/Catalog'
import Page from './component/Page'
import Box from './component/Box'

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

    if (currIndex >= 4 - 1) {
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
              items={['首页', 'TypeError课程介绍', '课程内容', '未命名']}
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
              <pre>
                <code className="language-js">{`const a = 1
const str = \`hahaha ${a}\` `}</code>
              </pre>
            </Page>
            <Route exact path="/" render={_ => <Redirect to={'/0'} />} />
          </div>
        </Router>
      </div>
    )
  }
}
