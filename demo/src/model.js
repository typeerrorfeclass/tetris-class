import widgetFactory from './widget'
import { TILE_NUM_X, TILE_NUM_Y, EMPTY_TILE, FULLFILLED_TILE, ACTIVE_TILE } from './const'

function repeat (fn, times) {
  const ret = []

  for (let i = 0; i < times; ++i) {
    ret.push(fn())
  }

  return ret
}

export default class Model {
  level = 1
  context = null
  isPaused = false

  get stage () {
    return this.stage_
  }

  get widget () {
    return this.widget_
  }

  get failed () {
    return this.failed_
  }

  get started () {
    return this.started_
  }

  constructor () {
    this.started_ = false
  }

  start () {
    this.initStage()
    this.initWidget()
    this.initTimer()

    this.failed_ = false
    this.started_ = true
  }

  stop () {
    this.started_ = false

    this.clearTimer()
    this.clearWidget()
    this.clearStage()
  }

  pause () {
    this.isPaused = true
  }

  resume () {
    this.isPaused = false
  }

  getTileState (x, y) {
    return this.stage[y][x]
  }

  setTileState (x, y, state) {
    this.stage[y][x] = state
  }

  // 左移
  widgetGoLeft () {
    if (this.isPaused) {
      return
    }

    this.widget.goLeft()
    this.updateActionResult()
  }

  // 右移
  widgetGoRight () {
    if (this.isPaused) {
      return
    }

    this.widget.goRight()
    this.updateActionResult()
  }

  // 下移
  widgetGoDown () {
    if (this.isPaused) {
      return
    }

    this.widget.goDown()
    this.updateActionResult()
  }

  // 翻转
  widgetRotate () {
    if (this.isPaused) {
      return
    }

    this.widget.rotate()
    this.updateActionResult()
  }

  // 速降
  widgetGoFast () {
    if (this.isPaused) {
      return
    }

    this.widget.goFast()
  }

  updateActionResult () {
    this.clearActiveTiles()

    const { widget } = this

    if (widget) {
      // 刷新现在的widget位置
      widget.updateActionResult()
    }

    // 通知view更新画面
    this.context.emitModelChange()
  }

  // 清理stage中active的tile
  clearActiveTiles () {
    this.stage_ = this.stage.map(line => {
      return line.map(tileState => {
        if (tileState === ACTIVE_TILE) {
          return EMPTY_TILE
        }

        return tileState
      })
    })
  }

  initStage () {
    this.stage_ = repeat(_ => repeat(_ => EMPTY_TILE, TILE_NUM_X), TILE_NUM_Y)
  }

  clearStage () {
    this.initStage()
    this.updateActionResult()
  }

  initWidget () {
    this.widget_ = widgetFactory(this)
    this.updateActionResult()
  }

  clearWidget () {
    this.widget_ = null
  }

  initTimer () {
    this.timer_ = setInterval(this.timeout.bind(this), 100)
  }

  clearTimer () {
    clearInterval(this.timer_)
    this.timer_ = null
  }

  timeout () {
    const { level, widget } = this

    if (this.isPaused) {
      return
    }

    if (widget.fast) {
      this.doUpdate()
      return
    }

    this.counter_++
    if (this.counter_ < 11 - level) {
      return
    }

    this.doUpdate()
  }

  doUpdate () {
    this.updateActionResult(this)
    this.updateFailState()

    if (this.failed) {
      this.context.emitModelChange()
      return
    }

    this.updateWidget() // 新建widget或向下一格
    this.updateStage() // 消行
    this.updateFailState() // 判定有没有失败

    this.context.emitModelChange()
    this.counter_ = 0
  }

  updateStage () {
    const newStage = this.stage.map(line => {
      if (line.every(el => el === FULLFILLED_TILE)) {
        return null
      }

      return line
    }).filter(line => line)

    const fillNum = TILE_NUM_Y - newStage.length

    if (!fillNum) {
      this.stage_ = newStage
      return
    }

    this.stage_ = repeat(_ => repeat(_ => EMPTY_TILE, TILE_NUM_X), fillNum).concat(newStage)
  }

  updateFailState () {
    if (this.stage[0].some(el => el === FULLFILLED_TILE)) {
      this.failed_ = true
      this.stop()
    }
  }

  updateWidget () {
    if (!this.widget || this.widget.finished) {
      this.initWidget()
    } else {
      this.widgetGoDown() // 向下一格
    }
  }
}
