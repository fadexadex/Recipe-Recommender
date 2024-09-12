import express from "express";
// import { connect, connection } from "mongoose";
import { errorHandler } from "./middlewares/errorHandler";
import { config } from "dotenv";
import recipeRoute from "./routes";
import cors from "cors";
import {Server as SocketServer} from "socket.io";
import http from "http";  
import { RequestWithSocket } from "index";

config();

export class AppServer {
  private app: express.Application;
  private port: number;
  private server: http.Server;
  private io: SocketServer;

  constructor(port: number) {
    this.port = port;
    this.app = express();
    this.server = http.createServer(this.app);

  }

  private enableMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(recipeRoute);
    this.app.use(errorHandler); 
  }

  private setupSocket() {
     this.io = new SocketServer(this.server, {
      cors: {
        origin: "*",
      },
    });

    this.io.on("connection", (socket) => {
      console.log("User connected");
      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
  }

  private useSocket() {
    this.app.use((req: RequestWithSocket, res, next) => {
      req.io = this.io;
      next();
    });
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
    this.setupSocket();
    this.useSocket();
    // this.connectToDatabase();
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}
