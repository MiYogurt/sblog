'use strict';
/**
 * relation model
 */
export default class extends think.model.relation {

  init(...args){
    super.init(...args);

  }

  tablePrefix = '';
  tableName = 'categorys';
  relation = {
    posts: {
      type: think.model.HAS_MANY,
      model: 'post',
    }
  }

   /**
   * 得到随机cate
   * @param  {int} count 数量
   * @return {array} 对象集合
   */
  async getRandom(count){
    let max =  await this.count() - 1
    let data = await this.select()
    let data_array = []
    for (var i = count - 1; i >= 0; i--) {
      data_array.push( data[ Math.ceil(Math.random()*max) ] )
    }
    return data_array
  }
  
}