import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: `config/${process.env.NODE_ENV}.env` });

const app = express();

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`App listening on port ${port}...`))
