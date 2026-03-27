import 'dotenv/config'
import './config/connection.js'
import express from 'express';
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRouter.js'
import cors from 'cors'
const app = express();
const port = process.env.PORT || 3000;
app.use(cors())
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.get('/', (req,res)=> {

    res.send('Hello world!');
})


app.listen(port, () => {
    console.log(`Listening on port: http://localhost:${port}`);
})