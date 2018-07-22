import { EMPTY_TILE, ACTIVE_TILE, FULLFILLED_TILE, TILE_NUM_X, TILE_NUM_Y } from '../const'
import createInitialTiles from './tileFactory'

function trans (o, t) {
  let y = t.x - o.x
  let x = t.y - o.y

  t.x = x + o.x
  t.y = y + o.y
}

export default class Widget {
  fast = false
  finished = false

  get tiles () {
    return this.tiles_
  }

  get type () {
    return this.type_
  }

  constructor (type) {
    this.type_ = type
    this.tiles_ = createInitialTiles(type)
  }

  updateActionResult (model) {
    if (this.atBottom(model)) {
      // 到底或者被拦住了
      this.flushToModel(model, FULLFILLED_TILE)
      this.finished = true
    } else {
      this.flushToModel(model, ACTIVE_TILE)
    }
  }

  goDown () {
    this.tiles_ = this.tiles_.map(tile => {
      return {
        x: tile.x,
        y: tile.y + 1
      }
    })   
  }

  goLeft () {
    if (this.tiles_.some(tile => tile.x === 0)) {
      console.log(`已经移动到最左边.`)
      return
    }

    this.tiles_ = this.tiles_.map(tile => {
      return {
        x: tile.x - 1,
        y: tile.y
      }
    })  
  }

  goRight () {
    if (this.tiles_.some(tile => tile.x === TILE_NUM_X - 1)) {
      console.log(`已经移动到最右边.`)
      return
    }

    this.tiles_ = this.tiles_.map(tile => {
      return {
        x: tile.x + 1,
        y: tile.y
      }
    })  
  }

  goFast () {
    this.fast = true
  }

  rotate () {
    if (this.type !== 3) {
      return
    }

    // 以第二个tile为轴，x和y坐标互换
    const { tiles } = this
    const newTiles = tiles.map(el => {
      return {
        x: el.x,
        y: el.y
      }
    })
    const [t0, t1, t2, t3] = newTiles

    trans(t1, t0)
    trans(t1, t2)
    trans(t1, t3)

    const legal = newTiles.every(el => {
      const { x, y } = el
      return x >= 0 && y >= 0 && x < TILE_NUM_X && y < TILE_NUM_Y
    })

    if (!legal) {
      console.log(`非法位置`)
      return
    }

    this.tiles_ = newTiles
  }

  flushToModel (model, state) {
    const { tiles } = this
    tiles.forEach(tile => {
      if (tile.x < 0 || tile.y < 0 ||
        tile.x >= TILE_NUM_X || tile.y >= TILE_NUM_Y) {
        return
      }

      model.setTileState(tile.x, tile.y, state)
    })
  }

  atBottom (model) {
    const { tiles } = this

    return tiles.some(tile => {
      return (tile.y === TILE_NUM_Y - 1) ||
        (model.getTileState(tile.x, tile.y + 1) === FULLFILLED_TILE)
    })
  }
}
