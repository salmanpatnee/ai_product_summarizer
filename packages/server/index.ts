import dontenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './routes';

dontenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
   console.log(`Server is running at http://localhost:${port}`);
});
