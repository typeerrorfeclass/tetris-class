// import Tetris from './tetris'

import('./tetris').then(mod => {
  const game = new mod.default('#app')

  game.level = 6
  game.start()
})

