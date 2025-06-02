// src/types/Book.ts

// Result from searchBooks (unchanged)
export interface BookSearchResult {
  key: string; // e.g. "/works/OL12345W"
  title: string;
  author_name?: string[];
  cover_i?: number;
}

// Result from getBookDetails
export interface BookDetails {
  title: string;
  description?: string | { value: string };
  subjects?: string[];
  covers?: number[];

  // ◀︎ ADD these fields to match /works/{workId}.json response
  authors?: {
    author: { key: string }; // e.g. { key: "/authors/OL23919A" }
  }[];

  // Some Work objects include first_publish_date (string); others might have first_publish_year (number)
  first_publish_date?: string;
  first_publish_year?: number;
}
