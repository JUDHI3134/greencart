import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config"
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import connectCloudinary from "./configs/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import { stripeWebhooks } from "./controllers/orderController.js";


const app = express();
const port = process.env.PORT || 4000

//db connection
await connectDB();
await connectCloudinary();

//allow multiple origins
const allowedOrigin = [
    "http://localhost:5173"
]

app.post('/stripe',express.raw({type: 'application/json'}), stripeWebhooks)

//middleware configuration
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: allowedOrigin, credentials: true}))

app.get("/", (req, res) => {
    res.send("API is Working")
})

//route endpoint
app.use("/api/user", userRouter)
app.use("/api/seller", sellerRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/address",addressRouter)
app.use("/api/order",orderRouter)


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})