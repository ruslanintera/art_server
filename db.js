const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    process.env.DB_NAME, // Название БД
    process.env.DB_USER, // Пользователь
    process.env.DB_PASSWORD, // ПАРОЛЬ
    {
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        pool: {
            max: 100,
            min: 0,
            idle: 200000,
            // @note https://github.com/sequelize/sequelize/issues/8133#issuecomment-359993057
            acquire: 1000000,
        }

    }
)

/*
{
    dialect: "mysql",
    operatorsAliases: false,
    host: config.get("dbConfig.host"),
    pool: {
      max: 100,
      min: 0,
      idle: 200000,
      // @note https://github.com/sequelize/sequelize/issues/8133#issuecomment-359993057
      acquire: 1000000,
    }
  }

BIG: ===============================================================
  pool: Pool {
    idleTimeoutMillis: 200 000,
    acquireTimeoutMillis: 1 000 000,
    reapIntervalMillis: 1000,
    maxUsesPerResource: Infinity,
    _factory: {
      max: 100,
      min: 0,
      acquireTimeoutMillis: 1000 000,
      idleTimeoutMillis: 200 000,
      reapIntervalMillis: 1000,
      maxUses: undefined
    },
  }

SMALL: ===============================================================
  sequelize Pool {
    idleTimeoutMillis: 10 000,
    acquireTimeoutMillis: 60 000,
    reapIntervalMillis: 1000,
    maxUsesPerResource: Infinity,
    _factory: {
        max: 5,
        min: 0,
        acquireTimeoutMillis: 60 000,
        idleTimeoutMillis: 10 000,
        reapIntervalMillis: 1000,
        maxUses: undefined
    },
    }

*/
