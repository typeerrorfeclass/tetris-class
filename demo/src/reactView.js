import shortid from 'shortid'
import ReactDOM from 'react-dom'
import ViewComponent from './ViewComponent'
import './view.less'

export default class View {
  context = null
  onRender = null

  get el () {
    return this.el_
  }

  get id () {
    return this.id_
  }

  constructor (sel) {
    this.id_ = shortid()
    const el = this.el_ = document.querySelector(sel)

    this.initReactViewComponent()
  }

  initReactViewComponent() {
    ReactDOM.render(<ViewComponent view={this} id={this.id} />, this.el)
  }

  start () {
    this.onKeyDown_ = this.onKeyDown.bind(this)
    document.addEventListener('keydown', this.onKeyDown_)
  }

  stop () {
    document.removeEventListener('keydown', this.onKeyDown_)
    this.onKeyDown_ = null
  }

  onKeyDown (evt) {
    this.context.emitViewEvent(evt)
  }

  render (model) {
    const fn = this.onRender
    if (fn) fn(model)
  }
}
