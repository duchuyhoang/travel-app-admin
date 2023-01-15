import development from "./development.json";
import production from "./production.json";

const envs: {
  [key: string]: any;
} = {
  development: development,
  production: production,
};

export const ROOT_ENV = envs[process.env.REACT_APP_ENV as any];
