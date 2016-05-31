'use strict';

import Base from './base.js';
import pagination from 'think-pagination';
import path from 'path';
import fs from 'fs';

export default class extends Base {

  async listAction(){
    let model = this.model("post")
    let data = await model.page(this.get("page"), 20).countSelect();
    let html = pagination(data, this.http, {});
    this.assign({
     "post" : data,
     "pagination" : html
    });
    return this.display();
  }

  async newAction(){
    let cate_model = this.model('category');
    let cate_data = await cate_model.select();
    let tag_model = this.model('tag');
    let tag_data = await tag_model.select();
    this.assign({
      "cate":cate_data,
      "tag":tag_data
    });
    return this.display();
  }

  async newPostAction(){
    let post = this.post()
    let model = this.model('post')
    let InsertData = {
      title: post.name,
      description: post.description,
      category_id: post.cate,
      content: post.content,
      photograph_url: post.post_background
    }
    let insertId = await model.add(InsertData)
    let p_t = this.model('post_tag')
    if (post.tag.length>1) {
      post.tag.forEach(item => {
        p_t.add({ post_id: insertId, tag_id : item })
      }) 
    }else{
      p_t.add({ post_id: insertId, tag_id : post.tag })
    }
    
    // this.http(post);

    return this.redirect('/end_plist')

  }

  async editAction(){
    let id = this.param('id');
    let model = this.model('post');
    let post = await model.where({id:id}).find();

    let cate_model = this.model('category');
    let cate_data = await cate_model.field('id,name').select();
    let tag_model = this.model('tag');
    let tag_data = await tag_model.field('id,name').select();

    let post_tag_model = this.model('post_tag');
    let post_tag_data = await post_tag_model.field('tag_id').where({post_id:id}).select()

    tag_data.forEach( item_outter => {
      post_tag_data.forEach( item_inner => {
        if (item_outter.id == item_inner.tag_id) {
          return item_outter.selected = true
        }
        return item_outter.selected = false
      })
    })

    this.assign({
      post: post,
      cate: cate_data,
      tag:  tag_data
    })
    return this.display();
  }

  async editPostAction(){
    let id = this.param('id')
    let data = this.post()
    delete data.id;
    let tag = data.tag;
    delete data.tag;
    let model = this.model('post');
    let affectedRow = await model.where({id: id}).update(data)
    // this.json(data);

    let post_tag = this.model('post_tag');
    await post_tag.delete({where: {post_id : id}});

    if (tag.length>1) {
      tag.forEach(item => {
        post_tag.add({ post_id: id, tag_id : item })
      }) 
    }else{
      post_tag.add({ post_id: id, tag_id : tag })
    }

    this.redirect('/end_pedit/'+id);
  }

  async destoryAction(){
    let id = this.param('id')
    let model1 = this.model('post')
    let post = await model1.setRelation('comment',false).delete({where: {id: id}})

    if (post) {
      return this.redirect('/end_plist');
    }

  }

  uploadAction(){
    let file = this.http._file;
    if (file.wangEditorH5File) {
      file = file.wangEditorH5File
    }
    if (file.file) {
      file = file.file
    }

    console.log(file);
    if (file && true) {
      var filepath = file.path;

      var uploadPath = think.UPLOAD_PATH;
      think.mkdir(uploadPath);
      var basename = path.basename(filepath);


      fs.renameSync(filepath, uploadPath + '/' + basename);
      file.path = 'http://localhost:8360/static/upload/' + basename;
      console.log(file.path);

      return this.json(file.path)
    }

    return this.json("error|服务器端错误")

  }
}