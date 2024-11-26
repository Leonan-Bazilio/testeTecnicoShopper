import express from "express";
import routes from "./routes/routes";
import "dotenv/config";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
