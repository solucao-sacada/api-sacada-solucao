import express from "express";

import "dotenv/config";

import "reflect-metadata";

import "express-async-errors";

import cors from "cors";

import { errorHandler } from "./usecases/errors/ErrorHandler";
import { router } from "./http/controllers/routes";

export const app = express();

app.use(express.json());

app.use(
    cors({
        origin: true,
        methods: "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS",
        preflightContinue: false,
        optionsSuccessStatus: 204,
    })
);

app.use(express.urlencoded({ extended: true }));
app.use(router);

app.use(errorHandler);