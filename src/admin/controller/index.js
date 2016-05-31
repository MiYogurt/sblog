'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    let username = await this.session('username');
    if (username === this.config('username')) {
      this.redirect('dashboard', 302)
    }
    return this.display();
  }

  async loginAction(){
    let username = this.post("username");
    let password = this.post("password");
    if (username === this.config('username') && password === this.config('password')) {
        await this.session("username", username);
        await this.cookie("username", username);
        return this.json({status:true});
    }
    return this.json({status:false});
  }

  async dashboardAction(){

    let post_count = await this.model('post').count();
    let cate_count = await this.model('category').count();
    let tag_count = await this.model('tag').count();

    this.assign({
      post_count: post_count,
      cate_count: cate_count,
      tag_count: tag_count,
    })
    return this.display();
  }

}