import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import { config } from "dotenv";
import recipeRoute from "./routes";
import cors from "cors";
import { Server as SocketServer } from "socket.io";
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

	public startApp() {
		this.enableMiddlewares();
		this.setupSocket();
		this.useSocket();
		this.server.listen(this.port, () => {
			console.log(`Server is running on port ${this.port}`);
		});
	}
}
