export const API_URL = import.meta.env.PROD
  ? "https://final-project-pgm-serdkara.onrender.com/api"
  : "http://localhost:1337/api";

export const API_TOKEN = import.meta.env.PROD
  ? "f3a8aafa5af2b1b3e07e7213c5e86e095cff8ab5a225120813680a0c2795f456c156679c761df4b7b74ea4f1e8c52fa35c97f9fb654d3227f8853267a90a404a3a1124015e8faff916fa0cea236f082880fb6405bf800956ff08c8c1e742012d746be32ca67b031be2b5e63e590e4c10dd0a8d3e21bb314ea850dde021f05264"
  : "ccfefb2a9ea94ea3b7b29eb00ce2911d4a8c55d264e8c91b96776a8e42a8769bd4783b0d89d30bae8e724e34ffa4c83a4a37af41600fa40a91557abdaf1af8554745be3f59aba6393ca22016f2e97536b296c8a00f472a5009714bdf2987074cc0d8020e74f146969987251b25075ff3a623a97bde26f8e7f0759882fe74e2e2";
export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
