'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'sqlite',
  adapter: {
    sqlite: {
      database: 'blog',
      path: 'databases' //设置存储数据文件的目录
    }
  }
};