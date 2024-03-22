import express from "express";
import routers from "./routes/index";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

const port = 3001;

app.use('/',routers)

app.listen(port,()=>{console.log("server running")});
