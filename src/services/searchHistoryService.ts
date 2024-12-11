interface SearchHistoryEntry {
    query: string;
    timestamp: Date;
    userId?: string;
  }
  
  export class SearchHistoryService {
    private searchHistory: SearchHistoryEntry[] = [];
  
    recordSearch(query: string, userId?: string) {
      const entry: SearchHistoryEntry = {
        query,
        timestamp: new Date(),
        userId
      };
      this.searchHistory.push(entry);
    }
  
    getRecentSearches(userId?: string, limit = 10) {
      // If userId is provided, filter by userId
      const userSearches = userId 
        ? this.searchHistory.filter(entry => entry.userId === userId)
        : this.searchHistory;
  
      // Return most recent searches
      return userSearches
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, limit);
    }
  }