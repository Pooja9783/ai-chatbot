const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config();

const connectDB = require('./db/connect')
const authRoutes = require("./routes/auth.routes")
const conversationRouter = require("./routes/conversation.routes")
const chatRoutes = require('./routes/chat.routes')

const app = express()

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());


app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "ai-assitant",
    timestamp: new Date().toDateString()
  })
})

app.use("/api/auth", authRoutes)
app.use("/api/conversations", conversationRouter);
app.use("/api/chat", chatRoutes);


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is listening from PORT:${PORT}`);
  connectDB()

})