import { Request, Response } from 'express';
import { stories } from '../models/Story';
import { SearchService } from '../services/searchService';
import { SearchHistoryService } from '../services/searchHistoryservice';

const searchService = new SearchService(stories);
const searchHistoryService = new SearchHistoryService();

// Hardcoded test user
const TEST_USER_ID = 'test-user-123';

export const searchStories = (req: Request, res: Response) => {
  try {
    const { 
      q: query, 
      page, 
      limit, 
      sortBy,
      useSynonyms = 'true' // Default to true
    } = req.query;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    // Record search in history with hardcoded user ID
    searchHistoryService.recordSearch(query, TEST_USER_ID);

    const result = searchService.search({
      query,
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
      sortBy: sortBy as 'relevance' | 'date',
      useSynonyms: useSynonyms === 'true' 
    });

    res.json(result);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getSearchHistory = (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const searchHistory = searchHistoryService.getRecentSearches(TEST_USER_ID, limit);
    res.json(searchHistory);
  } catch (error) {
    console.error('Search history error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};