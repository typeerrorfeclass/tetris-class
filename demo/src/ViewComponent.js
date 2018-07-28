import React from 'react'
import { TILE_NUM_X, TILE_NUM_Y, ACTIVE_TILE, FULLFILLED_TILE } from './const'

export default class ViewComponent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {}

    const view = props.view
    view.onRender = this.handleViewRender.bind(this)
  }

  handleViewRender (model) {
    this.setState({
      model: model,
      timestamp: Date.now()
    })
  }

  renderTiles (model) {
    const classNameMap = []

    for (let y = 0; y < TILE_NUM_Y; ++y) {
      for (let x = 0; x < TILE_NUM_X; ++x) {
        const state = model.getTileState(x, y)
        const className = `x${x}y${y}`

        let colorClass = ''

        if (state === ACTIVE_TILE) {
          colorClass = 'yellow'
        } else if (state === FULLFILLED_TILE) {
          colorClass = 'red'
        }

        const cls = `tile ${className} ${colorClass}`

        classNameMap.push(cls)
      }
    }

    return classNameMap.map(cls => <div className={cls} />)
  }

  render () {
    const { id } = this.props
    const { model } = this.state

    if (!model) {
      return null
    }

    return <div className='tetris-tile-wrap' id={id}>
      { this.renderTiles(model) }
    </div>
  }
}
