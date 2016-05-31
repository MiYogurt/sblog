'use strict';

import Base from './base.js'

export default class extends Base {

  async indexAction(){
    let category = this.model("category")
    let category_data = await category.select()

    let tag = this.model("tag")
    let tag_data = await tag.select()
    this.assign({
      "category": category_data,
      "tag": tag_data
    })

    return this.display()
  }

  async detailAction(){
    let id = this.get('id')
    let model = this.model('category')
    let cate = await model.where({id:id}).find()
    // this.http.success(cate);
    this.assign({ "cate" : cate})
    this.display()
  }
}
