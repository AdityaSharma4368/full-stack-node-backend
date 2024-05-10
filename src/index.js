import express from "express";
import mongoose from "mongoose";
import env from "dotenv";
import routes from "./routes/route.js";
import bodyParser from "body-parser";

const app = express();
app.use(express.json()); // We need this line for express application to accept the JSON body when post API is hit.
env.config();

// mongodb+srv://FB00230:<password>@cluster0.ogpm0.mongodb.net/?retryWrites=true&w=majority
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.8wwtvmg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    {}
  )
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api", routes);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    message,
    success: false,
    status: statusCode,
  });
});

app.get("/", (req, res) => {
  res.send({
    message: "Hello from Server",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} `);
});
