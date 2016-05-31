'use strict';
/**
 * relation model
 */
export default class extends think.model.relation {
  init(...args){
    super.init(...args);
  }

  tablePrefix = '';
  tableName = 'posts';
  
  relation = {
      comments:{
        type: think.model.HAS_MANY,
        model: 'comment'
      },
      tags: {
        type: think.model.MANY_TO_MANY,
        model: 'tag',
        rModel: 'posts_tags',
        rfKey: "tag_id"
      }
  }

   /**
   * 得到随机post
   * @param  {int} count 数量
   * @return {array} 对象集合
   */
  async getRandom(count){
    let data = await this.model('post').order('random()').limit(count).select()
    return data
  }

}