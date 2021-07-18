const express = require("express");
const multer = require("multer");
const foods = express.Router();
const FoodController = require("../controllers/foodController");
const { authorization } = require("../middlewares/auth");

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb({ status: 400, message: "Allowed file types: jpeg, jpg, png" });
    }
  },
  limits: {
    fileSize: 255000,
  },
});

foods.get("/", FoodController.get);
foods.get("/:id", FoodController.getById);
foods.post("/create", upload.single("imgUrl"), FoodController.create);
foods.put("/update/:id", upload.single("imgUrl"), FoodController.update);
foods.patch(
  "/update-status/:id",
  upload.single("imgUrl"),
  FoodController.updateStatus
);
foods.delete("/delete/:id", FoodController.delete);

module.exports = foods;
