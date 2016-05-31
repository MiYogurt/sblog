'use strict';

import Base from './base.js'

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    let category = this.model("category")
    let r_cate = await category.getRandom(4)
    let category_data = category.select()

    let post = this.model("post")
    let r_post = await post.getRandom(6)
    let post_data = await post.order({id: "DESC"}).limit(5).select()

    post_data.forEach(function(post){
      category_data.map(function(cate) {
        if (post.category_id === cate.id) {
          post.category_name = cate.name
        }
      })
    })

    this.assign({
      "post": post_data,
      "r_post": r_post,
      "r_cate": r_cate,
    })
    return this.display()
  }

  async categoryAndTagAction(){
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

  async friendSiteListAction(){
    let model = this.model('site_config')
    let data = await model.where({key:'friend_list'}).find()
    // this.json(data)
    this.assign({
      data:data
    })
    return this.display()
  }
  
  async aboutAction(){
    let model = this.model('site_config')
    let about_me = await model.where({key:'about_me'}).find()
    let about_site = await model.where({key:'about_site'}).find()
    let concat_me = await model.where({key:'concat_me'}).find()
    
    this.assign({
      about_me:about_me,
      about_site:about_site,
      concat_me:concat_me,
      
    })
    return this.display()
  }
}
