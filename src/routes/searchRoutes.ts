import express from 'express';
import { searchStories, getSearchHistory } from '../controllers/searchController';

const router = express.Router();

router.get('/search', searchStories);

router.get('/search-history', getSearchHistory);

export default router;