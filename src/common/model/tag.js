'use strict';
/**
 * relation model
 */
export default class extends think.model.relation {

  init(...args){
    super.init(...args);

  }

  tablePrefix = '';
  tableName = 'tags'; 
  relation = {
    posts: {
       type: think.model.MANY_TO_MANY,
       model: 'post',
       rModel: 'posts_tags',
       rfKey: "post_id"
    }
  }
}