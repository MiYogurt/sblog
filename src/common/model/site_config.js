'use strict';
/**
 * model
 */
export default class extends think.model.base {
  init(...args){
    super.init(...args);
    
  }

  tablePrefix = ''; 
  tableName = 'site_config';
}