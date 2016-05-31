'use strict';
/**
 * model
 */
export default class extends think.model.base {
  init(...args){
    super.init(...args);
    
  }

  tablePrefix = ''; 
  tableName = 'posts_tags';
}