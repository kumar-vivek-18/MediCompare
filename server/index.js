import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db/db.js';
import bodyParser from 'body-parser';
import utilsRouter from './routes/utils.routes.js';
import medicineRouter from './routes/medicine.routes.js';
import puppeteerRouter from './routes/puppeter.routes.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());
dotenv.config({ path: './.env' });



app.get('/', (req, res) => {
    res.send("Server is running");
});
app.use('/utils', utilsRouter);
app.use('/medicine', medicineRouter);
app.use('/puppetter', puppeteerRouter);

connectDB()
    .then(() => {
        app.listen(6000, () => {
            console.log('Server is running at port'.yellow.bold, 6000);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    });