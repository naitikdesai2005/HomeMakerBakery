import express from 'express';
import reviewModel from '../models/reviewModel';
import jwt from 'jsonwebtoken';

const createReview = async (req, res) => {
  try {
    const userId = req.user._id;
    const { rating, description, bakerId } = req.body;
    const review = new reviewModel({
      userId,
      bakerId,
      rating,
      description,
    });
    await review.save();
    res.json({ message: 'Review created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating review' });
  }
};

export { createReview };