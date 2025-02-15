export interface Author {
  name: string;
  id: number;
}

export interface Book {
  id: number;
  title: string;
  author: Author;
  year: number;
  genre: string;
}

export interface AuthorDetails {
  id: number;
  name: string;
  birthYear: number;
  nationality: string;
  deathYear: number;
  notableWorks: string[];
  bio: string;
}

export interface IError {
  errorCode: string[];
  errorMessage: string;
}
