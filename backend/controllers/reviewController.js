import express from 'express';
import reviewModel from '../models/reviewModel';

const createReview = async (req, res) => {
  try {
    const { rating, description, bakerID } = req.body;
    const review = new reviewModel({
      userId: req.user._id,
      bakerID,
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