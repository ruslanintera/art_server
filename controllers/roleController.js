const uuid = require("uuid");
const path = require("path");
const { role } = require("../models/models");
const ApiError = require("../error/ApiError");

class Controller {
  async create(req, res, next) {
    try {
      let { id, name } = req.body;
      if (!name) {
        name = "";
      }
      const newRecord = await role.create({ name });
      return res.json(newRecord);
    } catch (e) {
      //console.error("ERROR CREATE", e.message, req.body)
      next(ApiError.badRequest(e.message));
    }
  }
  async update(req, res, next) {
    try {
      let { id } = req.params;
      let { name } = req.body;

      if (id && name) {
        const updatedRecord = await role.update(
          { name },
          { where: { id: id } }
        );
        return res.json(updatedRecord);
      } else {
        next(ApiError.badRequest("недостаточно данных"));
      }
    } catch (e) {
      //console.error("ERROR UPDATE", e.message, req.body)
      next(ApiError.badRequest(e.message));
    }
  }
  async getAll(req, res, next) {
    try {
      let { id, name, limit, page } = req.query;
      page = page || 1;
      limit = limit || 10;
      let offset = page * limit - limit;
      limit = parseInt(limit);
      offset = parseInt(offset);
      let where = {};

      if (id) {
        where.id = id;
      }
      if (name) {
        where.name = name;
      }

      const getAllRecords = await role.findAndCountAll({
        where,
        limit,
        offset,
      });
      return res.json(getAllRecords);
    } catch (e) {
      //console.error("ERROR getAll", e.message, req.body)
      //return 'Обработка';
      next(ApiError.badRequest(e.message));
    }
  }
  async getOne(req, res) {
    try {
      let { id } = req.params;
      const oneRecord = await role.findOne({ where: { id: id } });
      return res.json(oneRecord);
    } catch (e) {
      //console.error("ERROR getOne", e.message, req.body)
      //return 'Обработка';
      next(ApiError.badRequest(e.message));
    }
  }
  async delete(req, res) {
    try {
      let { id } = req.params;
      role
        .destroy({
          where: { id: id },
        })
        .then(() => {
          res.send("success destroy");
        });
    } catch (e) {
      //console.error("ERROR DELETE", e.message, req.body)
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new Controller();
