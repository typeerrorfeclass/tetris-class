export default class Controller {
    constructor (view, model) {
      this.view_ = view
      this.model_ = model
  
      view.context = this
      model.context = this
    }
  
    // model变更
    emitModelChange () {
      const mdl = this.model_
  
      if (!mdl.started) {
        return
      }
  
      this.view_.render(mdl)
    }
  
    // view事件
    emitViewEvent (evt) {
      const mdl = this.model_
  
      if (!mdl.started) {
        return
      }
  
      const code = evt.code
  
      if (code === 'ArrowLeft') {
        mdl.widgetGoLeft()
      } else if (code === 'ArrowRight') {
        mdl.widgetGoRight()
      } else if (code === 'ArrowDown') {
        mdl.widgetGoFast()
      } else if (code === 'ArrowUp') {
        mdl.widgetRotate()
      }
    }
  }
  