'use strict'

import Base from './base.js'
import pagination from 'think-pagination';
export default class extends Base {

  async detailAction(){
    let id = this.get('id')
    let model = this.model('post')
    let post = await model.where({id:id}).find(); 
    // this.http.success(post);
    this.assign({ "post" : post})
    this.display()
  }

  async allAction(){
    let model = this.model("post")
    let data = await model.page(this.get("page"), 10).countSelect();
    let html = pagination(data, this.http, {});
    // this.http.success({
    //  "post" : data,
    //  "pagination" : html
    // })
    this.assign({
     "post" : data,
     "pagination" : html
    })
    this.display()
  }

  async commentAction(){
    let post_id = this.get('post_id')
    let email = this.post('email')
    let username = this.post('username')
    let content = this.post('content')

    let model = this.model("comment");
    let insertId = await model.add({
        post_id: post_id,
        email: email,
        username: username,
        content: content
    });


    return this.redirect('/post/'+post_id);
  }

}