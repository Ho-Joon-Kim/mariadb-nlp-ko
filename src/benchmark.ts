import { DataSource } from "typeorm";
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
  synchronize: false,
  charset: "utf8mb4_general_ci",
  entities: [path.join(__dirname, "./entity", "/**/*.{ts,js}")],
});

const benchmark = async () => {
  await AppDataSource.initialize();

  const keword = "정말 재미있는 영화 입니다";

  const startLike = Date.now();
  const Likedata = await Like.createQueryBuilder("like")
    .where("like.review REGEXP :keword", {
      keword: keword.replaceAll(" ", "|"),
    })
    .getMany();
  const endLike = Date.now();
  const executionTimeLike = endLike - startLike;

  const startFulltext = Date.now();
  const FulltextData = await Fulltext.createQueryBuilder("fulltext")
    .where(`MATCH(fulltext.review) AGAINST ('${keword}')`)
    .getMany();
  const endFulltext = Date.now();
  const executionTimeFulltext = endFulltext - startFulltext;

  console.log("Like data count: " + Likedata.length);
  console.log("Like execution time: " + executionTimeLike + "ms");
  console.log("Fulltext data count: " + FulltextData.length);
  console.log("Fulltext execution time: " + executionTimeFulltext + "ms");
  exit();
};
benchmark();
