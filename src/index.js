import express from "express";
import env from "dotenv";
import routes from "./routes/route.js";
import cors from "cors";
import { notFound, errorHandler } from "./middleware/error.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json()); // We need this line for express application to accept the JSON body when post API is hit.
app.use(express.urlencoded({ extended: true }));
app.use(cors());
env.config();

connectDB();

app.use(cookieParser());

// mongodb+srv://FB00230:<password>@cluster0.ogpm0.mongodb.net/?retryWrites=true&w=majority
// mongoose
//   .connect(
//     `mongodb+srv://adityasharma:5cpKwD5gxj2wl0f7@mern-cluster.6ddevuo.mongodb.net/?retryWrites=true&w=majority&appName=mern-cluster`,
//     {}
//   )
//   .then(() => {
//     console.log("Database Connected");
//   })
//   .catch((err) => {
//     console.log(err);
//   });


app.use("/api", routes);

app.get("/", (req, res) => {
  res.send({
    message: "Hello from Server",
  });
});

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} `);
});
