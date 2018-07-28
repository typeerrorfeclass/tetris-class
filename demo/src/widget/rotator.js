import { TILE_NUM_X, TILE_NUM_Y } from '../const'

function trans (o, t) {
  let y = -(t.x - o.x)
  let x = t.y - o.y

  t.x = x + o.x
  t.y = y + o.y
}

function normalRotate (widget, n = 1) {
  // 以第n个tile为轴，逆时针旋转
  const { tiles } = widget
  const newTiles = tiles.map(el => {
    return {
      x: el.x,
      y: el.y
    }
  })
  const o = newTiles[n]

  newTiles.forEach((tile, index) => {
    if (index === n) {
      return
    }

    trans(o, tile)
  })

  const legal = newTiles.every(el => {
    const { x, y } = el
    return x >= 0 && y >= 0 && x < TILE_NUM_X && y < TILE_NUM_Y
  })

  if (!legal) {
    console.log(`非法位置`)
    return
  }

  widget.tiles = newTiles
}

const rorator = {
  0: widget => {
    // 什么都不用做
  },

  1: widget => {
    normalRotate(widget)
  },

  2: widget => {
    normalRotate(widget, 0)
  },

  3: widget => {
    normalRotate(widget)
  },

  4: widget => {
    normalRotate(widget)
  },

  5: widget => {
    normalRotate(widget)
  }
}

export default function rorate (widget) {
  rorator[widget.type](widget)
}
