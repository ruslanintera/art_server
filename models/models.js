const sequelize = require("../db");

const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  name: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: false,
    defaultValue: "",
  },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
  isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
  activationLink: { type: DataTypes.STRING, defaultValue: "" },
  //roleid: { type: DataTypes.STRING, defaultValue: "USER" },
  //dc: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0}, // distribution_center
});

const Token = sequelize.define("token", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }, // user: {type: Schema.Types.ObjectId, ref: 'User'},
  refreshToken: { type: DataTypes.STRING, allowNull: false },
});

const role = sequelize.define(
  "role",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      defaultValue: "",
    },
    user: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  },
  { freezeTableName: true }
);

const manufacturer = sequelize.define(
  "manufacturer",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      defaultValue: "",
    },
    user: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  },
  { freezeTableName: true }
);

const dc = sequelize.define(
  "dc",
  {
    // distribution_center
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      defaultValue: "",
    },
    adress: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      defaultValue: "",
    },
    model3d: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      defaultValue: "",
    },
    color: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      defaultValue: "",
    },
    params1: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: false,
      defaultValue: "",
    },
    params2: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: false,
      defaultValue: "",
    },
    params3: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: false,
      defaultValue: "",
    },
    user: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  },
  { freezeTableName: true }
);

const racktype = sequelize.define(
  "racktype",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      defaultValue: "",
    },
    manufacturer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    model3d: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      defaultValue: "",
    },
    color: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      defaultValue: "",
    },
    params1: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      defaultValue: "",
    },
    params2: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      defaultValue: "",
    },
    params3: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      defaultValue: "",
    },
    dts: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      defaultValue: "",
    },
    dt: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    user: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  },
  { freezeTableName: true }
);

const photovideo = sequelize.define("photovideo",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, defaultValue: "pv " },
    manufacturer: { type: DataTypes.INTEGER, defaultValue: 0 },
    pathimg: { type: DataTypes.STRING, defaultValue: "" },
    color: { type: DataTypes.STRING, defaultValue: "#00F" },
    params1: { type: DataTypes.STRING, defaultValue: "" },
    params2: { type: DataTypes.STRING, defaultValue: "" },
    params3: { type: DataTypes.STRING, defaultValue: "" },
    type: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    user: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  },
  { freezeTableName: true }
);
const video = sequelize.define("video",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, defaultValue: "video " },
    manufacturer: { type: DataTypes.INTEGER, defaultValue: 0 },
    pathimg: { type: DataTypes.STRING, defaultValue: "" },
    color: { type: DataTypes.STRING, defaultValue: "#00F" },
    params1: { type: DataTypes.STRING, defaultValue: "" },
    params2: { type: DataTypes.STRING, defaultValue: "" },
    params3: { type: DataTypes.STRING, defaultValue: "" },
    type: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    user: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  },
  { freezeTableName: true }
);
const photo = sequelize.define("photo",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, defaultValue: "photo " },
    manufacturer: { type: DataTypes.INTEGER, defaultValue: 0 },
    pathimg: { type: DataTypes.STRING, defaultValue: "" },
    color: { type: DataTypes.STRING, defaultValue: "#00F" },
    params1: { type: DataTypes.STRING, defaultValue: "" },
    params2: { type: DataTypes.STRING, defaultValue: "" },
    params3: { type: DataTypes.STRING, defaultValue: "" },
    type: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    user: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  },
  { freezeTableName: true }
);
const audio = sequelize.define("audio",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, defaultValue: "audio " },
    manufacturer: { type: DataTypes.INTEGER, defaultValue: 0 },
    pathimg: { type: DataTypes.STRING, defaultValue: "" },
    color: { type: DataTypes.STRING, defaultValue: "#00F" },
    params1: { type: DataTypes.STRING, defaultValue: "" },
    params2: { type: DataTypes.STRING, defaultValue: "" },
    params3: { type: DataTypes.STRING, defaultValue: "" },
    type: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    user: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  },
  { freezeTableName: true }
);



module.exports = {
  User,
  Token,
  role,
  manufacturer,
  dc,
  racktype,
  photovideo,
  video,
  photo,
  audio,
};
