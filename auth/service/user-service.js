const { User } = require("../../models/models");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");

class UserService {
  async registration(email, password) {
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4(); // v34fa-asfasf-142saf-sa-asf

    const user = await User.create({
      email,
      password: hashPassword,
      activationLink,
    });
    // await mailService.sendActivationMail(
    //   email,
    //   `${process.env.API_URL}/api/auth/activate/${activationLink}`
    // );

    const userDto = new UserDto(user); // id, email, isActivated
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async activate(activationLink) {
    const user = await User.findOne({ where: { activationLink } }); // { where: { activationLink } }

    if (!user) {
      throw ApiError.BadRequest("Неккоректная ссылка активации");
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким email не найден");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }
    const userDto = new UserDto(user.dataValues);
    //console.log("!!!!!!!!!!!!!!                      userDto = ", userDto);
    const tokens = tokenService.generateTokens({ ...userDto });
    //console.log("!!!!!!!!!!!!!!                      tokens = ", tokens);

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    //console.log("44 logout === TOKEN TO DESTROY", refreshToken);
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    //const user = await User.findById(userData.id);
    const user = await User.findOne({ where: { id: userData.id } });
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    //console.log(" ====  user = ", user, "tokens", tokens);
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    const users = await User.findAll();
    return users;
  }
}

module.exports = new UserService();

async function test11(User) {
  //c onsole.log("TEST 33                 User.findOne = ", User.findOne);
  //for (let key in User) { c onsole.log("key = ", key, ", User[key] = ", User[key]); }
  const candidate = await User.findOne({ where: { email: "yyy" } });
  if (candidate) {
    throw ApiError.BadRequest(
      `Пользователь с почтовым адресом ${email} уже существует`
    );
  } else {
    console.error("NO User");
  }
}
