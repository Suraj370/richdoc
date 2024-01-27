const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();

const httpServer = require("http").createServer(app);



const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});


io.on("connection", (socket) => {
  socket.on("send-changes", (delta) => {
    console.log(delta);
    socket.broadcast.emit("receive-changes", delta);
  });
  console.log("connected");
});

const connectDb = require("./db");
const cookieParser = require("cookie-parser");
const cors = require("cors");


dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

connectDb();

const authRoutes = require("./routes/auth.routes");
const docRoutes = require("./routes/doc.routes");
const userRoute = require("./routes/user.routes");

app.use("/auth", authRoutes);
app.use("/user", userRoute);
app.use("/document", docRoutes);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running ...",
  });
});

httpServer.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
