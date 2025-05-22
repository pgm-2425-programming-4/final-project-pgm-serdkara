export const API_URL = import.meta.env.PROD
  ? "https://final-project-pgm-serdkara.onrender.com/api"
  : "http://localhost:1337/api";

export const API_TOKEN = import.meta.env.PROD
  ? "PROD token"
  : "c72e583390fe2a2de73caa9e9dbfcbb21481e56237b433d4380ac15875e6dbc431e20888c1740d6e8031d0a263123da6bff345131009acb9c27ce862614467d5c4aafe93918b0d5868bfa24777dfc5e561d0de5e947f279c3ccaf37b4f872321559e7e65e048a16850ac7a588555761809cd943d77b5005247abdccb104ed785";
export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
