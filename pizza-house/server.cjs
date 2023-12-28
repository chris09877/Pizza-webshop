require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const app = express();
app.use(express.json());


const PORT = process.env.PORT || 5173;

mongoose.connect(process.env.MONGO_KEY, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
}).catch((err) => console.log (`${err} did not connect`));

