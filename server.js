const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// Uncaught Exception (Handling Sync Code)
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message, err.stack);
  console.log('Uncaught Exception 💥 Shutting down...');
  process.exit(1);
});
const app = require('./app');

const port = process.env.PORT || 3000;
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('DB connection successfull');
  });

const server = app.listen(port, () =>
  console.log(`App is running on port ${port}`)
);

// Unhandled Promise Rejection (Handling async codes)
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandled Rejection 💥 Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
