import axios from "axios"; //promised based library for making API request to servers

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default instance;
