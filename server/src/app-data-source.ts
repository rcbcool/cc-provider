import { DataSource } from "typeorm";

const myDataSource = new DataSource({
  type: "sqlite",
  database: "./src/database/cc-provider.sqlite",
  entities: ["./src/entity/*.ts"],
  logging: true,
  synchronize: true,
});

export { myDataSource };
