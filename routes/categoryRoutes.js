const express = require("express");
const router = express.Router();
const controller = require("../controllers/categoryController");

router.post("/", controller.createCategory);
router.get("/", controller.getCategories);
router.get("/:idOrName", controller.getCategory);
router.put("/:id", controller.updateCategory);

module.exports = router;
