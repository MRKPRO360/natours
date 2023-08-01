const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const errMsg = Object.values(err.keyValue)[0];

  const message = `Duplicate field value ${errMsg}. Please use another name!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors)
    .map((el) => el.message)
    .join('. ');
  const message = `Invalid input data. ${errors}`;
  return new AppError(message, 400);
};

const handleJwtError = () => {
  const message = 'Invalid token. Please log in again!';
  return new AppError(message, 401);
};

const handleJWTExpiredError = () => {
  const message = 'Your token has expired. Please log in again';
  return new AppError(message, 401);
};

const sendErrorDev = (err, req, res) => {
  // API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      err: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    console.error('Error 💥', err);
    // RENDERD WEBSITE (For the frontend)
    return res.status(err.statusCode).render('error', {
      title: 'Something went very wrong!',
      msg: err.message,
    });
  }
};

const sendErrorProd = (err, req, res) => {
  // API
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      // error that we created using AppError class
      // log the error
      console.error('Error 💥', err);
      // send back a generic message
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      // don't leak all the informations because the error isn't created by the user
      return res.status(500).json({
        err,
        status: 'error',
        message: 'Something went very wrong',
      });
    }
  } else {
    // RENDERD WEBSITE (For the frontend)
    if (err.isOperational) {
      // error that we created using AppError class
      return res.status(err.statusCode).render('error', {
        title: 'Something went very wrong!',
        msg: err.message,
      });
    } else {
      // log the error
      console.error('Error 💥', err);
      // don't leak all the informations because the error isn't created by the user
      return res.status(err.statusCode).render('error', {
        title: 'Something went very wrong!',
        msg: 'Please try again later!',
      });
    }
  }
};

// Global error handling controller
const errorController = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'err';

  //ERROR IN DEVELOPMENT
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  }

  //ERROR IN PRODUCTION
  else if (process.env.NODE_ENV === 'production') {
    let error = Object.assign(err);
    if (error.name === 'CastError') {
      error = handleCastErrorDB(error);
    }
    if (error.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    }
    if (error.name === 'ValidationError') {
      error = handleValidationErrorDB(error);
    }
    if (error.name === 'JsonWebTokenError') error = handleJwtError();

    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
  next();
};

module.exports = errorController;
