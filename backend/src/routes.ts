import express from "express";
const router = express.Router();
import RecipeController from "./controller/RecipeController";
import uploadImage from "../src/utils/multer";
import uploadErrorHandler from "../src/middlewares/uploadErrorHandler";

const Recipe = new RecipeController();

router.post("/recommend-dishes", Recipe.generateMeals);
router.post("/chat", Recipe.chat);
router.post("/download-ingredient-list", Recipe.downloadIngredientList);
router.post(
	"/cook-photo",
	uploadImage.single("image"),
	uploadErrorHandler,
	Recipe.cookPhoto
);

export default router;
