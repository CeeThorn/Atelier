import "dotenv/config";

import express from "express";
import cors from "cors";
import messageRoutes from "./routes/messages";
import conversationRoutes from "./routes/conversations";
import profileRoutes from "./routes/profiles";
import addressesRoutes from "./routes/addresses";


console.log(" SERVER FILE STARTED");
console.log("SUPABASE_URL =", process.env.SUPABASE_URL);

const app = express();


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Backend is running " });
});

//  routes
app.use("/messages", messageRoutes);
app.use("/conversations", conversationRoutes);
app.use("/profiles", profileRoutes);
app.use("/addresses", addressesRoutes);



app.listen(5000, () => {
  console.log(" Backend running on http://localhost:5000");
});