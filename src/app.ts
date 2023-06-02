import 'reflect-metadata';
import 'express-async-errors';
import express, { Express } from 'express';
import cors from 'cors';

const app = express();

app.use(cors()).use(express.json());
