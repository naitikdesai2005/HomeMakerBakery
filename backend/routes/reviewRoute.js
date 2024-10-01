import express from 'express';
import {createReview} from './reviewController';
import authMiddleware from '../middleware/auth';

const reviewRouter = express.Router();

reviewRouter.post('/writeReview', authMiddleware, createReview);

export default reviewRouter;