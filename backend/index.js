require('dotenv').config();

const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db');
const cookieParser = require("cookie-parser");

const holdingsRoutes = require("./routes/holdingsRoutes");
const positionsRoutes = require("./routes/positionsRoutes");
const ordersRoutes = require("./routes/ordersRoutes");
const authRoute = require("./routes/authRoutes");

const PORT = process.env.PORT || 3002;

const app = express();

app.set("trust proxy", 1);

// Middlewares
app.use(
  cors({
    origin: [
      "https://zerodha-stock-trading-frontend.netlify.app",
      "https://zerodha-stock-trading-dashboard.netlify.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/", authRoute); 
app.use("/", holdingsRoutes);
app.use("/", positionsRoutes);
app.use("/", ordersRoutes);

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log("App started!");
  });
};

startServer();