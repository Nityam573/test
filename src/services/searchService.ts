import { Story } from '../models/Story';
import { highlightKeywords } from '../utils/highlightUtils';
import { SynonymService } from './synonymService';

export interface SearchOptions {
  query: string;
  page?: number;
  limit?: number;
  sortBy?: 'relevance' | 'date';
  useSynonyms?: boolean;
}

export class SearchService {
  private stories: Story[];
  private synonymService: SynonymService;

  constructor(stories: Story[]) {
    this.stories = stories;
    this.synonymService = new SynonymService();
  }

  search(options: SearchOptions) {
    const { 
      query, 
      page = 1, 
      limit = 10, 
      sortBy = 'relevance', 
      useSynonyms = true 
    } = options;

    const searchQueries = useSynonyms 
      ? this.synonymService.expandSearchQuery(query)
      : [query];

    const searchResults = this.stories.filter(story => 
      searchQueries.some(searchQuery => 
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    // Sort results
    const sortedResults = this.sortResults(searchResults, sortBy, query);

    // Pagination
    const startIndex = (page - 1) * limit;
    const paginatedResults = sortedResults.slice(startIndex, startIndex + limit);

    // Highlight keywords
    const highlightedResults = paginatedResults.map(story => ({
      ...story,
      titleHighlighted: this.highlightMultipleQueries(story.title, searchQueries),
      contentHighlighted: this.highlightMultipleQueries(story.content, searchQueries)
    }));

    return {
      results: highlightedResults,
      total: searchResults.length,
      page,
      totalPages: Math.ceil(searchResults.length / limit),
      usedQueries: searchQueries 
    };
  }

  private highlightMultipleQueries(text: string, queries: string[]): string {
    return queries.reduce((highlightedText, query) => 
      highlightKeywords(highlightedText, query), 
      text
    );
  }

  private sortResults(results: Story[], sortBy: string, query: string) {
    switch (sortBy) {
      case 'relevance':
        return results.sort((a, b) => {
          const scoreA = this.calculateRelevanceScore(a, query);
          const scoreB = this.calculateRelevanceScore(b, query);
          return scoreB - scoreA;
        });
      case 'date':
        return results.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      default:
        return results;
    }
  }

  private calculateRelevanceScore(story: Story, query: string): number {
    const synonymQueries = this.synonymService.expandSearchQuery(query);
    
    const matchScore = synonymQueries.reduce((score, synonymQuery) => {
      const titleMatch = story.title.toLowerCase().includes(synonymQuery.toLowerCase());
      const contentMatch = story.content.toLowerCase().includes(synonymQuery.toLowerCase());
      
      if (titleMatch) score += 2; 
      if (contentMatch) score += 1;
      
      return score;
    }, 0);

    return matchScore;
  }
}