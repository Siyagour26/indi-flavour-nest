import express from "express";
import "./dbConfig/dbConfig.js";
import "./models/association.js";
import bodyParser from "body-parser";
import "./models/association.js";
import userRoutes from "./routes/user.routes.js";
import recipeRoutes from "./routes/recipes.routes.js";
import favRoutes from "./routes/favorite.routes.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

// app.use((req, res, next) => {
//   console.log("incomeing req", req.method, req.url);
//   next();
// });
app.use("/uploads", express.static("uploads"));
app.use("/user", userRoutes);
app.use("/recipes", recipeRoutes);
app.use("/fav", favRoutes);

app.listen(PORT, () => {
  console.log("Server started");
});
