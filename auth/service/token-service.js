const jwt = require("jsonwebtoken");
const { Token } = require("../../models/models");

class TokenService {
  generateTokens(payload) {
    //console.log("766767676767667777 1 generateTokens payload", payload);
    //const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '15s'})
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "15d",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    //console.log("766767676767667777 2 generateTokens token", accessToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    //c onsole.log("================================================================userId = ", userId)
    const tokenData = await Token.findOne({ where: { user: userId } });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await Token.create({ user: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken) {
    //const tokenData = await tokenModel.deleteOne({refreshToken})
    console.log("removeToken === TOKEN TO DESTROY", refreshToken);

    const tokenData = Token.destroy({
      where: { refreshToken: refreshToken },
    }).then(() => {
      //console.log("=========== TOKEN DESTROY");
      //res.send("success destroy")
    });

    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await Token.findOne({ where: { refreshToken } });
    return tokenData;
  }
}

module.exports = new TokenService();
