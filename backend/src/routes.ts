import express from 'express';
const router = express.Router();
import RecipeController from './controller/Recommend';

const Recipe = new RecipeController();


router.post('/recommend-dishes', Recipe.generateMeals);
router.post('/chat', Recipe.chat);


export default router;