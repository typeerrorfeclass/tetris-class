import shortid from 'shortid'
import { TILE_NUM_X, TILE_NUM_Y, ACTIVE_TILE, FULLFILLED_TILE } from './const'
import './view.less'

const { floor } = Math

const divsHTML = ('<div $></div>,')
  .repeat(TILE_NUM_X * TILE_NUM_Y)
  .split(',')
  .filter(el => el.length)
  .map((el, index) => {
    const y = floor(index / TILE_NUM_X)
    const x = index % TILE_NUM_X
    return el.replace('$', `class="tile x${x}y${y}"`)
  }).join('')

export default class View {
  context = null

  get el () {
    return this.el_
  }

  get id () {
    return this.id_
  }

  constructor (sel) {
    this.id_ = shortid()
    const el = this.el_ = document.querySelector(sel)
    el.innerHTML = this.createHTMLContent()
  }

  createHTMLContent () {
    return `<div class='tetris-tile-wrap' id=${this.id}>
      ${divsHTML}
    </div>`
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
    for (let x = 0; x < TILE_NUM_X; x++) {
      for (let y = 0; y < TILE_NUM_Y; y++) {
        const state = model.getTileState(x, y)
        const className = `x${x}y${y}`
        const tileElement = this.el.querySelector(`.${className}`)

        if (!tileElement) {
          continue
        }

        let colorClass = ''

        if (state === ACTIVE_TILE) {
          colorClass = 'yellow'
        } else if (state === FULLFILLED_TILE) {
          colorClass = 'red'
        }

        const cls = `tile ${className} ${colorClass}`

        if (tileElement.className === cls) {
          continue
        }

        tileElement.className = cls
      }
    }
  }
}
