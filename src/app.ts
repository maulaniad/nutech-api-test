import express, { Express, Request, Response } from "express";
import morgan from "morgan";


const app: Express = express();
const port = process.env.PORT ?? 3000;

app.use(morgan(":method :url Params: :req[body] :response-time ms"));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
