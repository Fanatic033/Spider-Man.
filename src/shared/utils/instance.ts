import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNGY1OWRjZWE3MTU5M2ZmYTQxODM3YWEwNTFjMGM3YiIsIm5iZiI6MTc0MjU4NzU1OS4xNjcsInN1YiI6IjY3ZGRjNmE3YzcwYWNkZDlkZjY5YTM1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JpDVXfvXvv-ZwQ-H7tqMixlU4cs8hf2_lSxvXX1sPCs`,
    accept: "application/json",
  },  
});
