import express from 'express';
import { get1mgRes, getNetmedsResult, getPharmeasyResult } from './puppetter.js';

const app = express();



app.get('/', (req, res) => {
    res.send("Server is running");
});
app.get('/get-netmeds', getNetmedsResult);
app.get('/get-pharmeasy', getPharmeasyResult);
app.get('/get-get1mg', get1mgRes);

app.listen(5000, () => {
    console.log('Server is running at port 5000');
});