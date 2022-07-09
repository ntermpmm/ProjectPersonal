require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const contentRoute = require("./routes/contentRoute");
const itemRoute = require("./routes/itemRoute");
const orderRoute = require("./routes/orderRoute");
const authenticate = require("./middleware/authenticate");

const notFoundMiddleware = require("./middleware/notFound");
const errorMiddleware = require("./middleware/error");

const app = express();
app.use(cors());

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// const { sequelize } = require("./models");
// sequelize.sync({ alter: true });

app.use("/auth", authRouter);
app.use("/users", authenticate, userRouter);
app.use("/admin", userRouter);
app.use("/contents", contentRoute);
app.use("/items", itemRoute);
app.use("/orders", orderRoute);

// ## ROUTES
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
