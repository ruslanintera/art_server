const uuid = require('uuid')
const path = require('path');
const {dc} = require('../models/models')
const ApiError = require('../error/ApiError');

class Controller {
    async create(req, res, next) {
        try {
            let { id, name, adress, model3d, color, params1, params2, params3 } = req.body
            if(!name) {name = ""; }
            const newRecord = await dc.create({name, adress, model3d, color, params1, params2, params3});
            return res.json(newRecord)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async update(req, res, next) {
        try {
            let {id} = req.params
            let { name, adress, model3d, color, params1, params2, params3 } = req.body
            
            if(id) { 
                const updatedRecord = await dc.update(
                    { name, adress, model3d, color, params1, params2, params3 },
                    { where: { id: id } }
                );
                return res.json(updatedRecord)
            } else {
                next(ApiError.badRequest("недостаточно данных"))
            }
        } catch (e) {
            console.error("ERROR UPDATE", e.message, req.body)
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res) {
        try {
            let {id, name, adress, model3d, color, params1, params2, params3, limit, page} = req.query
            page = page || 1
            limit = limit || 10
            let offset = page * limit - limit
            limit = parseInt(limit); offset = parseInt(offset);
            let where = {};
           
            if( id ) { where.id = id; }
            if( name ) { where.name = name; }
            if( adress ) { where.adress = adress; }
            if( model3d ) { where.model3d = model3d; }
            if( color ) { where.color = color; }
            if( params1 ) { where.params1 = params1; }
            if( params2 ) { where.params2 = params2; }
            if( params3 ) { where.params3 = params3; }

            const getAllRecords = await dc.findAndCountAll({where, limit, offset})
            return res.json(getAllRecords)

        } catch (e) {
            console.error("ERROR getAll", e.message, req.body)
            //return 'Обработка';
            next(ApiError.badRequest(e.message))
        }
    }
    async getOne(req, res) {
        try {
            let {id} = req.params
            const oneRecord = await dc.findOne({ where: { id: id } })
            return res.json(oneRecord)
        } catch (e) {
            console.error("ERROR getOne", e.message, req.body)
            //return 'Обработка';
            next(ApiError.badRequest(e.message))
        }
    }
    async delete(req, res) {
        try {
            let {id} = req.params
            dc.destroy({
                where: { id: id }
              }).then(() => {
                res.send("success destroy")
              });
        } catch (e) {
            console.error("ERROR DELETE", e.message, req.body)
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new Controller()

