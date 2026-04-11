// export const auth = (req, res, next) => {
//   try {
//     console.log("Request allowed...");
//     next();
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({error: "Something went wrong"});
//   }
// };
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const auth = (req, res, next) => {
  console.log("Auth middleware hit");

  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = header.split(" ")[1];
    console.log("TOKEN:", token);

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("DECODED:", decoded);

    req.user = decoded;

    next();

  } catch (err) {
    console.log("Auth Error:", err.message);

    return res.status(401).json({ error: "Invalid token" })
  }
};
