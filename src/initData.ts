import { DataSource } from "typeorm";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { Fulltext } from "./entity/fulltext";
import { Like } from "./entity/like";
import { exit } from "process";
dotenv.config();

const AppDataSource = new DataSource({
  type: "mariadb",
  host: process.env["host"],
  port: Number(process.env["port"]),
  username: process.env["username"],
  password: process.env["password"],
  database: process.env["database"],
  logging: true,
  synchronize: true,
  charset: "utf8mb4_general_ci",
  entities: [path.join(__dirname, "./entity", "/**/*.{ts,js}")],
});

const initData = async () => {
  await AppDataSource.initialize();
  await Fulltext.deleteData();
  await Like.deleteData();

  for (let i = 10001; i <= 142621; i++) {
    try {
      const elements = await JSON.parse(
        fs.readFileSync(path.join(__dirname, `./data/${i}.json`), "utf8")
      );

      for (const element of elements) {
        await Fulltext.addData(element);
        await Like.addData(element);
      }
    } catch (e) {}
  }
  exit();
};
initData();
