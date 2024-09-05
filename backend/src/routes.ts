import express from 'express';
const router = express.Router();
import RecipeController from './controllers/Recommend';

const Recipe = new RecipeController();


router.post('/recommend-dishes', Recipe.generateMeals);


export default router;