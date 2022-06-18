const API_KEY = process.env.REACT_APP_API_KEY;
const image_url = "https://image.tmdb.org/t/p/original/";
const image_width = "https://image.tmdb.org/t/p/w500/";

const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchSearchResults: `/search/multi?api_key=${API_KEY}&language=en-US`,
  fetchTrailer: `?api_key=${API_KEY}&language=en-US&append_to_response=videos`,
};
export { image_url, image_width };
export default requests;
