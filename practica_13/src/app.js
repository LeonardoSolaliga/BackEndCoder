import express from 'express';
import {calculateNumber} from './calculateNumber.js';

const app = express();
const PORT = process.env.PORT||8080;
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(PORT,()=>console.log(`Listening on ${PORT}`));


app.get('/',(req,res)=>{
    res.send(`Petición atendida por ${process.pid}`)
})

app.get('/api/randoms', (req, res) => {
    console.log(req.query);
    let numberGenerate = req.query.cant ? req.query.cant : 100000000;
    let result = calculateNumber(numberGenerate);
    res.json(result)
});