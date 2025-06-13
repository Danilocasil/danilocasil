import axios from "axios";
import constants from "../constants";

const API_URL = `${constants.HOST}/api/articles`; 

export const fetchArticles = () => axios.get(API_URL);
export const createArticle = (article) => axios.post(API_URL, article);
export const updateArticle = (id, article) => axios.put(`${API_URL}/${id}`, article);
export const deleteArticle = (id) => axios.delete(`${API_URL}/${id}`);
export const fetchArticleByName = (name) => axios.get(`${API_URL}/name/${name}`);