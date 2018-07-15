import { EMPTY_TILE, ACTIVE_TILE, FULLFILLED_TILE, TILE_NUM_Y } from '../const'

export default class Widget {
  fast = false
  finished = false

  get tiles () {
    return this.tiles_
  }

  constructor (type) {
    // 田字
    this.tiles_ = [
      {x: 0, y: 0},
      {x: 1, y: 0},
      {x: 1, y: 1},
      {x: 2, y: 1}
    ]
  }

  update (model) {
    const { tiles } = this

    this.flushToModel(model, EMPTY_TILE)
    this.goDown()

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
    
  }

  goRight () {
    
  }

  rotate () {
    
  }

  flushToModel (model, state) {
    const { tiles } = this
    tiles.forEach(tile => {
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
