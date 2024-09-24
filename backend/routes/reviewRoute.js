import express from 'express';
import authMiddleware from "../middleware/auth.js";
import { createReview } from '../controllers/reviewController';

const reviewRoute = express.Router();

reviewRoute.post('/reviews', createReview);

export default reviewRoute;