// src/custom.d.ts
// import { Server as SocketServer } from "socket.io";
// import { Request } from "express";

// declare global {
//   namespace Express {
//     interface Request {
//       io?: SocketServer;
//     }
//   }
// }

import { Request, Response, NextFunction } from 'express'
import { Server as SocketServer } from 'socket.io'

export interface RequestWithSocket extends Request {
  io?: SocketServer;
}
export interface RequestWithFile extends Request {
  fileValidationError?: string
}
export interface IRecipe {
  hashtags: string[];
  dishName: string;
  shortDescription: string;
  ingredients: string[];
  steps: string[];
  dishUrl?: string; // Optional property to include the dish URL
}