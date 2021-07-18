// if (process.env.NODE_ENV === "development") {
//   require("dotenv").config();
// }
require("dotenv").config();

const cors = require("cors");
const express = require("express");
const routes = require("./routes");
const users = require("./routes/users");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(routes);

app.listen(port, () => {
  console.log(`listening app at https://localhost:${port}`);
});
