const uuid = require("uuid");
const path = require("path");
const { dc } = require("../models/models");
const ApiError = require("../error/ApiError");

class Controller {
  async create(req, res, next) {
    try {
      let { name, adress, model3d, color, params1, params2, params3 } =
        req.body;
      if (req.user) {
        const newRecord = await dc.create({
          name,
          adress,
          model3d,
          color,
          params1,
          params2,
          params3,
          user: req.user.id,
        });
        return res.json(newRecord);
      } else {
        next(ApiError.forbidden("доступ запрещен"));
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async update(req, res, next) {
    try {
      let { id } = req.params;
      let { name, adress, model3d, color, params1, params2, params3 } =
        req.body;
      //console.log("UPDATE 445 req.body = ", req.body);
      //const { refreshToken } = req.cookies;
      console.log("UPDATE 4456 req.user = ", req.user);

      if (id && req.user) {
        const oneRecord = await dc.findOne({
          where: { id: id, user: req.user.id },
        });
        if (oneRecord) {
          console.log("888888888888888888888888 oneRecord ");
          const updatedRecord = await dc.update(
            { name, adress, model3d, color, params1, params2, params3 },
            { where: { id: id, user: req.user.id } }
          );
          return res.json(updatedRecord);
        } else {
          console.log("доступ запрещен 4455=6677 2");
          next(ApiError.forbidden("доступ запрещен 4455=6677"));
        }
        console.log("**********56*********");
      } else {
        next(ApiError.badRequest("недостаточно данных"));
      }
    } catch (e) {
      console.error("ERROR UPDATE", e.message, req.body);
      next(ApiError.badRequest(e.message));
    }
  }
  async getAll(req, res) {
    try {
      let {
        id,
        name,
        adress,
        model3d,
        color,
        params1,
        params2,
        params3,
        limit,
        page,
      } = req.query;
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
      if (adress) {
        where.adress = adress;
      }
      if (model3d) {
        where.model3d = model3d;
      }
      if (color) {
        where.color = color;
      }
      if (params1) {
        where.params1 = params1;
      }
      if (params2) {
        where.params2 = params2;
      }
      if (params3) {
        where.params3 = params3;
      }

      const getAllRecords = await dc.findAndCountAll({ where, limit, offset });
      return res.json(getAllRecords);
    } catch (e) {
      console.error("ERROR getAll", e.message, req.body);
      //return 'Обработка';
      next(ApiError.badRequest(e.message));
    }
  }
  async getOne(req, res) {
    try {
      let { id } = req.params;
      const oneRecord = await dc.findOne({ where: { id: id } });
      return res.json(oneRecord);
    } catch (e) {
      console.error("ERROR getOne", e.message, req.body);
      //return 'Обработка';
      next(ApiError.badRequest(e.message));
    }
  }
  async delete(req, res) {
    try {
      let { id } = req.params;

      if (id && req.user) {
        const oneRecord = await dc.findOne({
          where: { id: id, user: req.user.id },
        });
        if (oneRecord) {
          dc.destroy({
            where: { id: id, user: req.user.id },
          }).then(() => {
            res.send("success destroy");
          });
        } else {
          next(ApiError.forbidden("доступ запрещен"));
        }
      } else {
        next(ApiError.badRequest("недостаточно данных"));
      }
    } catch (e) {
      console.error("ERROR DELETE", e.message, req.body);
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new Controller();
