require('dotenv').config();

const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors'); //for request to db  to send request to db
const app = express();
const session = require('express-session'); //for session
const secretKey = process.env.SESSION_SECRET;//secret key for sessions

app.use(session({
  secret: secretKey, // Secret used to sign the session ID cookie
  resave: false,//
  saveUninitialized: false,
  // Other configurations like cookie settings, store, etc.
}));

//cors middleware
app.use(cors({
  origin: 'http://localhost:5174',
  credentials: false,
}));

app.use(express.json());


//DEFINING ROUTES
const UserRoutes = require('./routes/users.cjs');
const PizzasRoutes = require('./routes/pizzas.cjs');
const OrdersRoutes = require('./routes/order.cjs');
const OrderDetailsRoutes = require('./routes/orderDetails.cjs');


app.use('/users', UserRoutes);
app.use('/pizzas', PizzasRoutes);
app.use('/orders', OrdersRoutes);
app.use('/carts', OrderDetailsRoutes);

const PORT = process.env.PORT || 3001;
//connection to mongoDB
mongoose.connect(process.env.MONGO_KEY, {

}).then(() => {
  const connectedDb = mongoose.connection.name;
  console.log(`DB NAME: ${connectedDb}`);
  //
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
}).catch((err) => console.log(`${err} did not connect`));