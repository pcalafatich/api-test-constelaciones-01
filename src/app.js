import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import pkg from "../package.json";

//import productRoutes from "./routes/products.routes";
import usersRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

import { createRoles, createAdmin} from "./libs/initialSetup";

//import http from 'http';
const http = require('http')
const socketio = require('socket.io')
const servidor = require('./sockets/server')


const app = express();
createRoles();
createAdmin();

//Sockets
const server = http.createServer(app)
const io = socketio(server)

io.on('connection', client => {
    console.log("Socket.id: ", client.id);
    servidor.iniciarSesion(io, client)
})

// Settings
app.set("pkg", pkg);
app.set("port", process.env.PORT || 4000);
app.set("json spaces", 4);

// Middlewares
const corsOptions = {
  // origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Welcome Routes
app.get("/", (req, res) => {
  res.json({
    message: "Constelaciones API TEST",
    name: app.get("pkg").name,
    version: app.get("pkg").version,
    description: app.get("pkg").description,
    author: app.get("pkg").author,
  });
});

// Routes
//app.use("/api/products", productRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);

export default app;
