const express = require("express");
const app = express();

const io  = require('socket.io')(3002, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

io.on("connection", socket => {
    socket.on('send-changes', delta => {
        console.log(delta);
       socket.broadcast.emit('receive-changes', delta)
    })
    console.log("connected");
})

const connectDb = require("./db");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config()
// Setting up port number
const PORT = process.env.PORT || 4000;

// Loading environment variables from .env file
dotenv.config();

 
// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);

connectDb()

const authRoutes = require("./routes/auth.routes");
const docRoutes = require('./routes/doc.routes')
const userRoute = require('./routes/user.routes')
// Setting up routes
app.use("/auth", authRoutes);
app.use('/user', userRoute)
app.use("/document", docRoutes)



// Testing the server
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

// Listening to the server
app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});

// End of code.