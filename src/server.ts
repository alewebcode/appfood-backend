import express,{ json } from 'express'
import cors from 'cors';
import path from 'path';

import routes from './routes'
import './database'


const app = express()

app.use(cors());
app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname,'..','uploads')))

app.listen(process.env.PORT || 3333)

