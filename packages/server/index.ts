import express from 'express';
import type { Request, Response } from 'express';
import dontenv from 'dotenv';
import { PrismaClient } from './generated/prisma';

dontenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/api/products/:id/reviews', async (req: Request, res: Response) => {
   const prisma = new PrismaClient()
   const productId = Number(req.params.id)

   if (isNaN(productId)) {
      res.status(400).json({ error: "Invalid product ID." })
      return;
   }

   const reviews = await prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' }
   })

   res.json(reviews)
});

app.listen(port, () => {
   console.log(`Server is running at http://localhost:${port}`);
});
