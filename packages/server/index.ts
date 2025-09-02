import express from 'express';
import type { Request, Response } from 'express';
import dontenv from 'dotenv';

dontenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
   res.send('Hello World!!');
});

app.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello from the API!' });
});

app.listen(port, () => {
   console.log(`Server is running at http://localhost:${port}`);
});
