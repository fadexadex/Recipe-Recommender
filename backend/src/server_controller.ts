import express from "express";
import { connect, connection } from "mongoose";
import { errorHandler } from "./middlewares/errorHandler";
import { config } from "dotenv";
import recipeRoute from "./routes";
import cors from "cors";

config();

export class Server {
  private app: express.Application;
  private port: number;

  constructor(port: number) {
    this.port = port;
    this.app = express();
  }

  private enableMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(recipeRoute);
    this.app.use(errorHandler); 
  }
  // private connectToDatabase() {
  //   connect(process.env.MONGO_DB_URL);
  //   connection.on("connected", () => {
  //     console.log("Connected to database");
  //   });
  //   connection.on("error", (error) => {
  //     console.error(`Error connecting to database: ${error}`);
  //   });
  // }

  public startApp() {
    this.enableMiddlewares();
    // this.connectToDatabase();
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}
