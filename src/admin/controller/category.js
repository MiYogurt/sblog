import rest from './rest.js'

export default class extends rest{
    init(http){
        super.init(http);
        this._method = "_method"; //指定请求类型从 GET 参数 _method 里获取
    }

    newAction(){
        return this.display()
    }
    async getAction(){
        if (this.id == 'new') {
            return this.action('category','new');
        }
        let data
        if (this.id) {
          let pk = await this.modelInstance.getPk();
          data = await this.modelInstance.where({[pk]: this.id}).find();
          this.assign({
            data: data
          }) 
          this.display();
          // return this.success(data);
        }
        data = await this.modelInstance.select();
        this.assign({
            data: data
        }) 
        this.display();
        // return this.success(data);
    }

    async postAction(){
        let model = await this.modelInstance
        await model.add({name: this.param('name'),description: this.param('description')});
        this.redirect('/admin/category');
    }

    async deleteAction(){
        if (!this.post('id')) {
          return this.fail("params error");
        }
        let pk = await this.modelInstance.getPk();
        let rows = await this.modelInstance.where({[pk]: this.post('id')}).setRelation(false).delete();
        // this.json("delete")
        this.redirect('/admin/category');
    }

    async putAction(){
        let pk = await this.modelInstance.getPk()
        let erow = await this.modelInstance.where({[pk]: this.id}).setRelation(false).update({name: this.param('name'),description: this.param('description')})
        // this.json(this.param())
        return this.redirect('/admin/category');
    }
}