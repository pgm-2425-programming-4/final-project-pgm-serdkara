export const API_URL = import.meta.env.PROD
  ? "https://final-project-pgm-serdkara.onrender.com/api"
  : "http://localhost:1337/api";

export const API_TOKEN = import.meta.env.PROD
  ? "f3a8aafa5af2b1b3e07e7213c5e86e095cff8ab5a225120813680a0c2795f456c156679c761df4b7b74ea4f1e8c52fa35c97f9fb654d3227f8853267a90a404a3a1124015e8faff916fa0cea236f082880fb6405bf800956ff08c8c1e742012d746be32ca67b031be2b5e63e590e4c10dd0a8d3e21bb314ea850dde021f05264"
  : "c72e583390fe2a2de73caa9e9dbfcbb21481e56237b433d4380ac15875e6dbc431e20888c1740d6e8031d0a263123da6bff345131009acb9c27ce862614467d5c4aafe93918b0d5868bfa24777dfc5e561d0de5e947f279c3ccaf37b4f872321559e7e65e048a16850ac7a588555761809cd943d77b5005247abdccb104ed785";
export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];