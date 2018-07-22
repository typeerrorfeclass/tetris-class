export default function createInitialTiles (type) {
  switch (type) {
    case 0:
      return createTiles0()
    case 1:
      return createTiles1()
    case 2:
      return createTiles2()
    case 3:
      return createTiles3()
    case 4:
      return createTiles4()
    case 5:
      return createTiles5()
  }

  return createTiles0()
}

// 田字
function createTiles0 () {
  return [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 0, y: 1},
    {x: 1, y: 1}
  ]
}

// 左折
function createTiles1 () {
  return [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 1, y: 1},
    {x: 2, y: 1}
  ]
}

// 右折
function createTiles2 () {
  return [
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 0, y: 1},
    {x: 1, y: 1}
  ]
}

// 长条
function createTiles3 () {
  return [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0}
  ]
}

// T型
function createTiles4 () {
  return [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 1, y: 1}
  ]
}

// L型
function createTiles5 () {
  return [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 1, y: 1},
    {x: 1, y: 2}
  ]
}
