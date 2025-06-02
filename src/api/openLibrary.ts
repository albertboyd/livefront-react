import axios from "axios";

export const searchBooks = async (query: string) => {
  const response = await axios.get(`https://openlibrary.org/search.json?q=${query}`);
  return response.data;
};

export const getBookDetails = async (workId: string) => {
  const response = await axios.get(`https://openlibrary.org/works/${workId}.json`);
  return response.data;
};
