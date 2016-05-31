'use strict'

import Base from './base.js'

export default class extends Base {
  async detailAction(){
    let id = this.get('id')
    let model = this.model('tag')
    let tag = await model.where({id:id}).find(); 
    // this.http.success(tag);
    this.assign({ "tag" : tag})
    this.display()
  }

}