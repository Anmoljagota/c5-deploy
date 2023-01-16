const express = require("express");
const cors = require("cors");
const { registerRouter } = require("./Routes/register.Route");
const { loginRouter } = require("./Routes/login.Route");
const { connection } = require("./Configue/db");
const {postRouter}=require("./Routes/post.Route")
const {Authentication}=require("./Middlewares/middleware")
require("dotenv").config();
const app = express();
app.use(express.json());
app.use("/users", registerRouter);
app.use("/users", loginRouter);
app.use(Authentication)
app.use("/posts",postRouter)
app.use(cors());
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to DB");
  } catch (err) {
    console.log(`error:${err}`);
  }
  console.log(`server is running on ${process.env.PORT}`);
});
