import { Server } from "./server_controller";

const port: number = Number(process.env.PORT) || 3000;

const server = new Server(port);
server.startApp();