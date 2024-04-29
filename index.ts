
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 3333;
const app: Express = express();
app.use(express.json());
app.use(cors());

interface FormInputs {
  email: string,
  password: string
}

// Array of example users for testing purposes
const users = [
  {
    id: 1,
    name: 'Maria Doe',
    email: 'maria@example.com',
    password: 'maria123'
  },
  {
    id: 2,
    name: 'Juan Doe',
    email: 'juan@example.com',
    password: 'juan123'
  }
];

// This code makes sure that any request that does not matches a static file
// in the build folder, will just serve index.html. Client side routing is
// going to make sure that the correct content will be loaded.
app.use((req, res, next) => {
  if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
      next();
  } else {
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      res.header('Expires', '-1');
      res.header('Pragma', 'no-cache');
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  }
});

app.use(express.static(path.join(__dirname, '../client/build')));


app.post('/login', (req: Request, res: Response) => {
  const { email, password }:FormInputs = req.body;

  const user = users.find(user => {
    return user.email === email && user.password === password
  });

  if (!user) {
    return res.status(404).send('User Not Found!')
  }

  return res.status(200).json(user)
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
