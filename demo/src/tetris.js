import View from './view'
import Controller from './controller'
import Model from './model'

export default class Tetris {
  get level () {
    return this.model_.level
  }

  set level (val) {
    this.model_.level = val
  }

  constructor (sel) {
    this.view_ = new View(sel)
    this.model_ = new Model()
    this.controller_ = new Controller(this.view_, this.model_)
  }

  start () {
    this.view_.start()
    this.model_.start()
  }

  stop () {
    this.model_.stop()
    this.view_.stop()
  }
}
