const checkPassword = require("../helpers/checkPassword");
const hashPassword = require("../helpers/hashPassword");
const { OAuth2Client } = require("google-auth-library");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const signAccessToken = require("../helpers/signAccessToken");

class UserController {
  static async register(req, res, next) {
    try {
      const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: hashPassword(req.body.password),
        role: "admin",
      };
      const data = await User.create(newUser, {
        attributes: ["name", "email"],
      });
      res.status(201).json({
        status: 201,
        data,
        message: "Register user successfully",
      });
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        let message = {};
        error.errors.forEach((el) => {
          message[el.path] = el.message;
        });
        next({ status: 400, message });
      } else {
        next({ status: 500, message: "Register user failed" });
      }
    }
  }

  static async login(req, res, next) {
    try {
      const data = await User.findOne({
        where: { email: req.body.email },
        attributes: ["id", "name", "email", "password", "role"],
      });
      if (data) {
        const isTrue = checkPassword(req.body.password, data.password);
        if (isTrue) {
          res.status(200).json({
            status: 200,
            data,
            access_token: signAccessToken(data),
            message: "Login user successfully",
          });
        } else {
          throw { status: 401, message: "Wrong password entered" };
        }
      } else {
        throw { status: 401, message: "Email is not registered" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: req.body.id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const data = await User.findOne({
        where: {
          email: payload.email,
        },
        attributes: ["name", "email", "password", "role"],
      });
      if (!data) {
        const createUser = await User.create({
          name: payload.name,
          email: payload.email,
          password:
            process.env.GOOGLE_PASSWORD + Math.random(+new Date() / 1000),
          role: "staff",
        });
        delete createUser.dataValues.createdAt;
        delete createUser.dataValues.updatedAt;
        if (createUser) {
          res.status(201).json({
            status: 201,
            data: createUser,
            access_token: signAccessToken(createUser),
            message: "Register user successfully",
          });
        }
      } else {
        res.status(201).json({
          status: 201,
          data,
          access_token: signAccessToken(data),
          message: "Login user successfully",
        });
      }
    } catch (error) {
      next({ status: 501, message: "Internal Server Error" });
    }
  }

  static async get(req, res, next) {
    try {
      const user = await User.findOne(
        {
          where: { email: req.user.data.email },
        },
        {
          attributes: ["name", "role"],
        }
      );
      res.status(200).json({
        status: 200,
        data: user,
        message: "Get user successfully",
      });
    } catch (error) {
      next({ status: 404, message: "Not found" });
    }
  }
}

module.exports = UserController;
