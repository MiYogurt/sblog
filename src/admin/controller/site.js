import Base from './base.js';

export default class extends Base {
    async indexAction(){
        let model = this.model('site_config')
        let data = model.select()
        this.assign({
            data:data
        })
        this.display()
    }
    async newAction(){
        this.display()
    }

    async editAction(){
        let id = this.param('id');
        // this.json(id)
        let model = this.model('site_config')
        let data = await model.where({id:id}).find()
        this.assign({
            data:data
        })
        this.display()
    }

    async postAction(){
        let data = this.param();
        // this.json(data);
        let model = this.model('site_config')
        let effectRows = await model.add({ key:data.key, value:data.value })
        return this.redirect('/admin/site')

    }

    async updateAction(){
        let data = this.param()
        let model = this.model('site_config')
        let effectRows = await model.where({'id':data.id}).update({key:data.key,value:data.value})
        return this.redirect('/admin/site')
    }

    async deleteAction(){
        let id = this.param('id');
        let model = this.model('site_config')
        let effectRows = await model.where({id:id}).delete()
        return this.redirect('/admin/site')
    }
}