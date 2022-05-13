const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // Bearer asfasnfkajsfnjk
    if (!token) {
      return res.status(401).json({ message: "Не авторизован 1" });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    console.log("222 decoded", decoded);

    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: "Не авторизован 2" });
  }
};

/** /
const ApiError = require('../exceptions/api-error')
const tokenService = require('../service/token-service')

module.exports = function (req, res, next) {
    try {

        const authorizationHeader = req.headers.authorization
        //const authorizationHeader = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImludGVyM2Rwb3N0QGdtYWlsLmNvbSIsImlkIjoyNCwiaXNBY3RpdmF0ZWQiOnRydWUsImlhdCI6MTYzNDc5NTMyNSwiZXhwIjoxNjM2MDkxMzI1fQ.lijvR_8wK4NZKfLGoQmQ6_DQsiR9tAKmdM6DmH4PhXM"
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError('auth err no auth header'))
        }

        const accessToken = authorizationHeader.split(' ')[1]
        if (!accessToken) {
            return next(ApiError.UnauthorizedError('auth err no access token'))
        }
        const userData = tokenService.validateAccessToken(accessToken)
        if (!userData) {
            return next(ApiError.UnauthorizedError('auth err val'))
        }

        req.user = userData
        next()
    } catch (e) {
        return next(ApiError.UnauthorizedError('auth err 111'))
    }
}
/**/
