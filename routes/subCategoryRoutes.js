const express = require("express");
const router = express.Router();
const controller = require("../controllers/subCategoryController");

router.post("/", controller.createSubCategory);
router.get("/", controller.getSubCategories);
router.get("/category/:categoryId", controller.getSubCategoriesByCategory);
router.get("/:idOrName", controller.getSubCategory);
router.put("/:id", controller.updateSubCategory);

module.exports = router;
