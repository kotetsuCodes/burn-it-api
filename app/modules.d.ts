declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_USERNAME: string;
    DATABASE_NAME: string;
    DATABASE_PASSWORD: string;
    JWT_SECRET: string
  }
}