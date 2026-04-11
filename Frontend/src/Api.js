const SERVER_BASE_URL = "http://localhost:3000";
export default {
  USER_SIGNUP: SERVER_BASE_URL + "/user/signup",
  USER_SIGNIN: SERVER_BASE_URL + "/user/signin",
  FETCH_RECIPES: SERVER_BASE_URL + "/recipes",
  ADD_RECIPE: SERVER_BASE_URL + "/recipes",
  MY_RECIPES: SERVER_BASE_URL + "/recipes/my",
  GET_RECIPE_BY_ID: (id) => `${SERVER_BASE_URL}/recipes/${id}`,
  DELETE_RECIPE: (id) => SERVER_BASE_URL + `/recipes/${id}`,
  UPDATE_RECIPE: (id) => SERVER_BASE_URL + `/recipes/${id}`,
};
