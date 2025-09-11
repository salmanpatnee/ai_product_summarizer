import express from 'express';
import dontenv from 'dotenv';
import router from './routes';

dontenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(router);

app.listen(port, () => {
   console.log(`Server is running at http://localhost:${port}`);
});
