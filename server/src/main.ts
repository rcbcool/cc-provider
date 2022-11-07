import express, { Express } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import { myDataSource } from "./app-data-source";
import cors from "cors";
import routes from "./routes";

// establish database connection
async function initializeServer() {
  try {
    await myDataSource.initialize();

    console.log("Successflly initialized!");
  } catch (err) {
    console.log("Initialiazing error!" + err);
  }

  dotenv.config();

  const PORT = process.env.PORT || 3002;
  const app: Express = express();

  const corsOptions = {
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
    ],
  };

  app.use(cors(corsOptions));
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/", routes);

  app.listen(PORT, () => console.log(`Running on ${PORT}`));
}

initializeServer();