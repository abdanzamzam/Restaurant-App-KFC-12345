const { Food, User, Category } = require("../models");
const formData = require("form-data");
const instanceAxiosImageKit = require("../helpers/instanceAxiosImageKit");
const {
  createHistory,
  putHistory,
  patchHistory,
  deleteHistory,
} = require("../helpers/createHistoryActivity");

class FoodController {
  static async get(req, res, next) {
    try {
      const data = await Food.findAll({
        attributes: [
          "id",
          "name",
          "description",
          "price",
          "imgUrl",
          "authorId",
          "categoryId",
          "status",
        ],
        order: [["id", "ASC"]],
        include: [
          {
            model: User,
            attributes: ["name"],
          },
          {
            model: Category,
            attributes: ["name"],
          },
        ],
      });
      res.status(200).json({
        status: 200,
        data,
        message: "Show all foods successfully",
      });
    } catch (error) {
      next({ status: 500, message: "Show all foods failed" });
    }
  }

  static async getById(req, res, next) {
    try {
      const data = await Food.findByPk(req.params.id, {
        attributes: [
          "id",
          "name",
          "description",
          "price",
          "imgUrl",
          "authorId",
          "categoryId",
          "status",
        ],
        include: [
          {
            model: User,
            attributes: ["name"],
          },
          {
            model: Category,
            attributes: ["name"],
          },
        ],
      });

      if (data) {
        if (
          req.user.data.role == "admin" ||
          data.authorId == req.user.data.id
        ) {
          res.status(200).json({
            status: 200,
            data,
            message: `Show data food by id successfully`,
          });
        } else {
          throw { status: 401, message: "Not haven't access" };
        }
      } else {
        throw { status: 404, message: "Data food not found" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    const { name } = req.body;
    const file = req.file.buffer.toString("base64");
    const formImageKit = new formData();

    formImageKit.append("fileName", name);
    formImageKit.append("file", file);

    try {
      const response = await instanceAxiosImageKit.post(
        "/files/upload",
        formImageKit,
        {
          headers: {
            ...formImageKit.getHeaders(),
          },
        }
      );
      const data = await Food.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        imgUrl: response.data.url,
        authorId: req.user.data.id,
        categoryId: req.body.categoryId,
        status: "active",
      });
      createHistory(data);
      res.status(201).json({
        status: 201,
        data,
        message: "Create data food successfully",
      });
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        let message = {};
        error.errors.forEach((el) => {
          message[el.path] = el.message;
        });
        next({ status: 400, message });
      } else {
        next({ status: 500, message: "Create food failed" });
      }
    }
  }

  static async update(req, res, next) {
    console.log(req.body);
    console.log(req.file);
    const { name } = req.body;
    const file = req.file.buffer.toString("base64");
    const formImageKit = new formData();

    formImageKit.append("fileName", name);
    formImageKit.append("file", file);

    try {
      const response = await instanceAxiosImageKit.post(
        "/files/upload",
        formImageKit,
        {
          headers: {
            ...formImageKit.getHeaders(),
          },
        }
      );
      const data = await Food.update(
        {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          imgUrl: response.data.url,
          authorId: req.body.authorId,
          categoryId: req.body.categoryId,
        },
        {
          where: { id: req.params.id },
          returning: [
            "id",
            "name",
            "description",
            "price",
            "imgUrl",
            "authorId",
            "categoryId",
          ],
        }
      );
      if (data[0] !== 0) {
        putHistory(data[1][0]);
        res.status(200).json({
          status: 200,
          data: data[1][0],
          message: "Update food successfully",
        });
      } else {
        throw { status: 404, message: "Id param not found" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    console.log(req.user.data.role);
    try {
      const dataBeforeDelete = await Food.findByPk(req.params.id);
      if (dataBeforeDelete) {
        if (
          req.user.data.role == "admin" ||
          dataBeforeDelete.authorId == req.user.data.id
        ) {
          await Food.destroy({ where: { id: req.params.id } });
          deleteHistory(dataBeforeDelete);
          res.status(200).json({
            status: 200,
            message: "Delete food successfully",
          });
        } else {
          throw { status: 401, message: "You don't have permission" };
        }
      } else {
        throw { status: 400, message: "Id param not found" };
      }
    } catch (error) {
      next({ status: 500, message: "Delete food failed" });
    }
  }

  static async updateStatus(req, res, next) {
    try {
      if (req.user.data.role !== "admin") {
        throw { status: 401, message: "You don't have permission" };
      } else {
        const food = await Food.findByPk(req.params.id);
        const data = await Food.update(
          {
            status: req.body.status,
          },
          {
            where: { id: req.params.id },
            retuning: true,
          }
        );
        if (data !== 0) {
          patchHistory(food, req.body.status);
          res.status(200).json({
            status: 200,
            message: "Update status successfully",
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = FoodController;
