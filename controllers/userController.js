const userService = require("../auth/service/user-service");
const { validationResult } = require("express-validator");
const ApiError = require("../auth/exceptions/api-error");
const Moralis = require("moralis/node");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Validation error", errors.array())
        );
      }
      const { moralis_session } = req.body;
      const moralisData = await Moralis.Cloud.run("getUserBySession", {sessionToken: moralis_session});
      // console.log(moralisData)
      if (!moralisData) {
        return next(
          ApiError.BadRequest("Moralis session not found", errors.array())
        );
      }

      const userData = await userService.registration(moralisData);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      //console.log("REFRESH req.cookies = refreshToken = ", refreshToken);
      const userData = await userService.refresh(refreshToken);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { moralis_session } = req.body;
      const moralisData = await Moralis.Cloud.run("getUserBySession", {sessionToken: moralis_session});
      if (!moralisData) {
        throw ApiError.BadRequest("No user found");
      }
      const userData = await userService.login(moralisData);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      console.log("44444444 getUsers 44444444 req.user", req.user);
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
