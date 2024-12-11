export function highlightKeywords(text: string, query: string): string {
    if (!query) return text;
  
    // Escape special regex characters
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Create case-insensitive regex
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    
    // Replace matched keywords with highlighted version
    return text.replace(regex, '<mark>$1</mark>');
  }