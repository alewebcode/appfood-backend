import express,{ json } from 'express'
import cors from 'cors';
import path from 'path';
import dotenv from "dotenv";

import routes from './routes'
import './database'

dotenv.config();

const app = express()

app.use(cors());
app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname,'..','uploads')))

app.listen(process.env.PORT || 3333)

