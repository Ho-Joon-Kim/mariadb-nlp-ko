import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

const AppDataSource = new DataSource({
  type: "mariadb",
  host: process.env["host"],
  port: Number(process.env["port"]),
  username: process.env["username"],
  password: process.env["password"],
  database: process.env["database"],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

