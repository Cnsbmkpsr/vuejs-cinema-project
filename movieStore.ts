import { defineStore } from "pinia";

export const useMovieStore = defineStore({
  id: "movie",

  state: () => ({
    movies: [],
  }),

  actions: {
    // Define your actions here
  },

  getters: {
    // Define your getters here
  },
});
