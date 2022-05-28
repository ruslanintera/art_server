const uuid = require("uuid");
const path = require("path");
const { photovideo } = require("../models/models");
const ApiError = require("../error/ApiError");
const fs = require("fs");

class Controller {
  transliterate(text, engToRus) {
    //console.log("1 transliterate    text = ", text);
    //var txt = "Съешь ещё этих мягких французских булок, да выпей же чаю!----Javascript 0980970890323987 #$%^&6777";
    //text = text.replace(/[^a-zа-яё\s0-9]/gi, '');
    text = text.replace(/[^a-zа-яё0-9]/gi, "");
    //text = text.replace(/[\s]/gi, '_');
    text = text.replace(/\s+/g, "_");

    var rus =
        "щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь".split(
          / +/g
        ),
      eng =
        "shh sh ch cz yu ya yo zh y1 y2 e1 a b v g d e z i j k l m n o p r s t u f x y3".split(
          / +/g
        );
    var x;
    for (x = 0; x < rus.length; x++) {
      text = text
        .split(engToRus ? eng[x] : rus[x])
        .join(engToRus ? rus[x] : eng[x]);
      text = text
        .split(engToRus ? eng[x].toUpperCase() : rus[x].toUpperCase())
        .join(engToRus ? rus[x].toUpperCase() : eng[x].toUpperCase());
    }
    //console.log("2 transliterate    text = ", text);

    return text;
  }

  async create(req, res, next) {
    try {
      let {
        name = "",
        manufacturer,
        pathimg,
        color,
        params1,
        params2,
        params3,
        type,
      } = req.body;
      console.log(" ====== req.user = ", req.user);
      if (req.user) {
        const newRecord = await photovideo.create({
          name,
          manufacturer,
          pathimg,
          color,
          params1,
          params2,
          params3,
          type,
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
      let {
        name,
        manufacturer,
        pathimg,
        color,
        params1,
        params2,
        params3,
        type,
        user,
      } = req.body;

      if (id && req.user) {
        const oneRecord = await photovideo.findOne({
          where: { id: id, user: req.user.id },
        });
        if (oneRecord) {
          const updatedRecord = await photovideo.update(
            {
              name,
              manufacturer,
              pathimg,
              color,
              params1,
              params2,
              params3,
              type,
              user,
            },
            { where: { id: id, user: req.user.id } }
          );
          return res.json(updatedRecord);
        } else {
          next(ApiError.forbidden("доступ запрещен"));
        }
      } else {
        next(ApiError.badRequest("недостаточно данных"));
      }
    } catch (e) {
      //console.error("ERROR UPDATE", e.message, req.body)
      next(ApiError.badRequest(e.message));
    }
  }
  async updatejpg(req, res, next) {
    try {
      let { id } = req.params;
      let {
        name,
        manufacturer,
        pathimg,
        color,
        params1,
        params2,
        params3,
        type,
        user,
      } = req.body;
      if (req.files) {
        let { img } = req.files;
        if (img.constructor === Array && img[0]) {
          params3 = [];
          let count = 1;
          for (let imgOne of img) {
            let fileName = `pic${count}.jpg`;
            params3.push(fileName);
            count++;
            try {
              user = req.user.id;
              const dirpath = path.resolve(
                __dirname,
                "..",
                "static/user_" + user + "/racktype_" + id
              );
              fs.mkdirSync(dirpath, { recursive: true });
              imgOne.mv(
                path.resolve(
                  __dirname,
                  "..",
                  "static/user_" + user + "/racktype_" + id,
                  fileName
                )
              );
            } catch (e) {
              console.error("!!!!!!!! ERROR DIR e=", e);
            }
          }
          params3 = `{"picscount": ${count - 1}}`;
        } else {
          let fileName = "pic1.jpg";
          try {
            user = req.user.id;
            const dirpath = path.resolve(
              __dirname,
              "..",
              "static/user_" + user + "/racktype_" + id
            );
            fs.mkdirSync(dirpath, { recursive: true });
            img.mv(
              path.resolve(
                __dirname,
                "..",
                "static/user_" + user + "/racktype_" + id,
                fileName
              )
            );
          } catch (e) {
            console.error("!!!!!!!! ONE FILE   ERROR DIR e=", e);
          }
          params3 = `{"picscount": 1}`;
        }
      }

      if (id) {
        const updatedRecord = await photovideo.update(
          {
            name,
            manufacturer,
            pathimg,
            color,
            params1,
            params2,
            params3,
            type,
            user,
          },
          { where: { id: id, user: req.user.id } }
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
  async uploadjpg(req, res, next) {
    try {
      let { id } = req.params;
      let {
        count,
        name,
        manufacturer,
        pathimg,
        color,
        params1,
        params2,
        params3,
        type,
        user,
      } = req.body;
      //console.log("uploadjpg  req = ", req);
      if (req.files) {
        let { img } = req.files;
        if (img.constructor === Array && img[0]) {
          params3 = [];
          let count = 1;
          for (let imgOne of img) {
            let fileName = `pic${count}.jpg`;
            //let fileName = uuid.v4() + ".jpg"
            params3.push(fileName);
            count++;
            try {
              user = req.user.id;
              const dirpath = path.resolve(
                __dirname,
                "..",
                "static/user_" + user + "/racktype_" + id
              );
              fs.mkdirSync(dirpath, { recursive: true });
              imgOne.mv(
                path.resolve(
                  __dirname,
                  "..",
                  "static/user_" + user + "/racktype_" + id,
                  fileName
                )
              );
            } catch (e) {
              console.error("!!!!!!!! ERROR DIR e=", e);
            }
          }
          params3 = `{"picscount": ${count - 1}}`;
        } else {
          let fileName = `pic${count}.jpg`;
          try {
            user = req.user.id;
            const dirpath = path.resolve(
              __dirname,
              "..",
              "static/user_" + user + "/racktype_" + id
            );
            fs.mkdirSync(dirpath, { recursive: true });
            img.mv(
              path.resolve(
                __dirname,
                "..",
                "static/user_" + user + "/racktype_" + id,
                fileName
              )
            );
          } catch (e) {
            console.error("!!!!!!!! ONE FILE   ERROR DIR e=", e);
          }
          params3 = `{"picscount": ${count}}`;
        }
      }

      if (id) {
        const updatedRecord = await photovideo.update(
          {
            name,
            manufacturer,
            pathimg,
            color,
            params1,
            params2,
            params3,
            type,
            user,
          },
          { where: { id: id, user: req.user.id } }
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
  async uploadmp3(req, res, next) {
    try {
      let { id } = req.params;
      let file_path = "";
      let {
        count,
        name,
        manufacturer,
        pathimg,
        color,
        params1,
        params2,
        params3,
        type,
        user,
      } = req.body;
      //console.log("uploadmp3  req.body = ", req.body)
      //console.log("uploadmp3  req.files = ", req.files)
      if (req.files) {
        //console.log("1");
        let { img } = req.files;
        if (img.constructor === Array && img[0]) {
          //console.log("2");
          params3 = [];
          let count = 1;
          for (let imgOne of img) {
            //let fileName = `audio${count}.mp3`
            //let fileName = "audio_" + uuid.v4() + ".mp3"

            //let fileName = "audio_" + this.transliterate(img.name) + ".mp3";
            let fileName = img.name;

            //console.log(", img.name = ",img.name,", img.name1 = ",img.name1,", fileName = ",fileName);

            params3.push(fileName);
            count++;
            try {
              user = req.user.id;
              const dirpath = path.resolve(
                __dirname,
                "..",
                "static/user_" + user + "/racktype_" + id
              );
              fs.mkdirSync(dirpath, { recursive: true });
              imgOne.mv(
                path.resolve(
                  __dirname,
                  "..",
                  "static/user_" + user + "/racktype_" + id,
                  fileName
                )
              );
              file_path =
                "static/user_" + user + "/racktype_" + id + "/" + fileName;
            } catch (e) {
              console.error("!!!!!!!! ERROR DIR e=", e);
            }
          }
          params3 = `{"picscount": ${count - 1}}`;
        } else {
          try {
            user = req.user.id;
            let fileName = img.name;

            const dirpath = path.resolve(
              __dirname,
              "..",
              "static/user_" + user + "/racktype_" + id
            );
            fs.mkdirSync(dirpath, { recursive: true });
            img.mv(
              path.resolve(
                __dirname,
                "..",
                "static/user_" + user + "/racktype_" + id,
                fileName
              )
            );
            file_path =
              "static/user_" + user + "/racktype_" + id + "/" + fileName;
            //console.log(" file_path = ",file_path);
          } catch (e) {
            console.error("!!!!!!!! ONE FILE   ERROR DIR e=", e);
          }
          params3 = `{"picscount": ${count}}`;
        }
      }
      //return res.json(file_path)

      if (id) {
        const updatedRecord = await photovideo.update(
          {
            name,
            manufacturer,
            pathimg,
            color,
            params1,
            params2,
            params3,
            type,
            user,
          },
          { where: { id: id, user: req.user.id } }
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
  async uploadglb(req, res, next) {
    try {
      let { id } = req.params;
      let {
        count,
        name,
        manufacturer,
        pathimg,
        color,
        params1,
        params2,
        params3,
        type,
        user,
      } = req.body;
      if (req.files) {
        let { img } = req.files;
        let count = 1;
        if (img.constructor === Array && img[0]) {
          params3 = [];
          for (let imgOne of img) {
            let fileName = `glb${count}.glb`;

            params3.push(fileName);
            count++;
            try {
              user = req.user.id;
              const dirpath = path.resolve(
                __dirname,
                "..",
                "static/user_" + user + "/racktype_" + id
              );
              fs.mkdirSync(dirpath, { recursive: true });
              imgOne.mv(
                path.resolve(
                  __dirname,
                  "..",
                  "static/user_" + user + "/racktype_" + id,
                  fileName
                )
              );
            } catch (e) {
              console.error("!!!!!!!! ERROR DIR e=", e);
            }
          }
          pathimg = "user_" + user + "/racktype_" + id + "/" + fileName;
        } else {
          let fileName = `glb${count}.glb`;
          try {
            user = req.user.id;
            const dirpath = path.resolve(
              __dirname,
              "..",
              "static/user_" + user + "/racktype_" + id
            );
            fs.mkdirSync(dirpath, { recursive: true });
            img.mv(
              path.resolve(
                __dirname,
                "..",
                "static/user_" + user + "/racktype_" + id,
                fileName
              )
            );
          } catch (e) {
            console.error("uploadglb  !!!!!!!! ONE FILE   ERROR DIR e=", e);
          }
          pathimg = "user_" + user + "/racktype_" + id + "/" + fileName;
        }
      }

      if (id) {
        const updatedRecord = await photovideo.update(
          {
            name,
            manufacturer,
            pathimg,
            color,
            params1,
            params2,
            params3,
            type,
            user,
          },
          { where: { id: id, user: req.user.id } }
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

  async uploadglbjpg(req, res, next) {
    try {
      let { id } = req.params;
      let {
        count,
        name,
        manufacturer,
        pathimg,
        color,
        params1,
        params2,
        params3,
        type,
        user,
      } = req.body;
      //console.log("UGJ 1 req.body", req.body);
      console.log("UGJ 1 pathimg = ", pathimg);

      if (!id || !req.user) {
        next(ApiError.badRequest("недостаточно данных 5457"));
        return;
      }
      console.log("UGJ 2 req.user", req.user);

      if (id && req.user) {
        const oneRecord = await photovideo.findOne({
          where: { id: id, user: req.user.id },
        });
        if (oneRecord) {
          //=================
          user = req.user.id;
          console.log("UGJ 3 user", user);
          const filePath = "user" + user + "/img" + id;
          const filePathStatic = "static/" + filePath;
          if (req.files) {
            const { imgs } = req.files;
            const { glb } = req.files;

            if (glb) {
              const fileName = `model.glb`;
              try {
                const dirpath = path.resolve(__dirname, "..", filePathStatic);
                fs.mkdirSync(dirpath, { recursive: true });
                glb.mv(path.resolve(__dirname, "..", filePathStatic, fileName));
                pathimg = filePath + "/" + fileName;
              } catch (e) {
                console.error("upload glb ERROR", e);
              }
            }

            const images = req.files;
            if (images) {
              let count = 1;
              params3 = [];

              for (let key in images) {
                const ext = path.extname(images[key].name);
                console.log(
                  "44 6 UGJ key = ",
                  key,
                  "images[key].name = ",
                  images[key].name,
                  "ext = ",
                  ext
                );
                //let fileName = `img${count}.jpg`;
                let fileName = `img_${count}` + ext;
                try {
                  const dirpath = path.resolve(__dirname, "..", filePathStatic);
                  fs.mkdirSync(dirpath, { recursive: true });
                  images[key].mv(
                    path.resolve(__dirname, "..", filePathStatic, fileName)
                  );
                  params3.push(fileName);
                  count++;
                } catch (e) {
                  console.error("upload images ERROR", e);
                }
              }
              params3 = JSON.stringify(params3);
            }
          }

          console.log("UGJ 4 user", user);
          const record = {
            name,
            manufacturer,
            pathimg,
            color,
            params1,
            params2,
            params3,
            type,
            user,
          };
          const updatedRecord = await photovideo.update(record, {
            where: { id: id, user: req.user.id },
          });

          console.log("UGJ 5 updatedRecord", updatedRecord);

          return res.json({ updatedRecord, record, id, user: req.user.id });
        } else {
          next(ApiError.forbidden("доступ запрещен 4455=6677"));
        }
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
      let {
        id,
        name,
        manufacturer,
        pathimg,
        color,
        params1,
        params2,
        params3,
        type,
        user,
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
      if (manufacturer) {
        where.manufacturer = manufacturer;
      }
      if (pathimg) {
        where.pathimg = pathimg;
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
      if (type) {
        where.type = type;
      }
      if (user) {
        where.user = user;
      }

      const getAllRecords = await photovideo.findAndCountAll({
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
  async getOne(req, res, next) {
    try {
      let { id } = req.params;
      const oneRecord = await photovideo.findOne({ where: { id: id } });
      return res.json(oneRecord);
    } catch (e) {
      //console.error("ERROR getOne", e.message, req.body)
      //return 'Обработка';
      next(ApiError.badRequest(e.message));
    }
  }
  async delete(req, res, next) {
    try {
      let { id } = req.params;

      if (id && req.user) {
        const oneRecord = await photovideo.findOne({
          where: { id: id, user: req.user.id },
        });
        if (oneRecord) {
          photovideo
            .destroy({
              where: { id: id, user: req.user.id },
            })
            .then(() => {
              res.send("success destroy");
            });
        } else {
          next(ApiError.forbidden("доступ запрещен"));
        }
      } else {
        next(ApiError.badRequest("недостаточно данных"));
      }
    } catch (e) {
      //console.error("ERROR DELETE", e.message, req.body)
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new Controller();
