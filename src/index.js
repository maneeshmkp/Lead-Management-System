import express from 'express';
import cookiesParser from "cokie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import leadRoutes from "./routes/leads.js";

const app = express();

app.use(express());
app.use(cookiesParser());
app.use(cors({origin: "http://localhost:5173", credentials: true}));

app.use("/auth", authRoutes);
app.use("/leads", leadRoutes);

app.listen(port, () =>{
    console.log(`Serve at http://localhost:${port}`);
})



