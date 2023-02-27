import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// There's no official support for pagination in the iTunes Search API, so get the first 200 results
// and then paginate on the client side using Redux.
// Alternatively, could use the unofficial offset parameter with 'limit' to paginate on the server side.
// Api supports both approaches but client currently uses the first approach.
app.get("/api", async (req: Request, res: Response) => {
  if (!req.query.term) {
    return res.status(400).send("Missing term");
  }
  try {
    const response =
      req.query.offset !== undefined && req.query.itemsPerPage
        ? await fetch(
            `https://itunes.apple.com/search?media=music&entity=musicArtist,album,song&limit=${req.query.itemsPerPage}&term=${req.query.term}&offset=${req.query.offset}`
          )
        : await fetch(
            `https://itunes.apple.com/search?media=music&entity=musicArtist,album,song&limit=200&term=${req.query.term}`
          );
    const data = await response.json();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
