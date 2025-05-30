import express from "express";
import cors from "cors";
import router from "./routes/routes.js";
const port = 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server is listening in ${port} port`);
});
