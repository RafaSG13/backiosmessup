class AppError extends Error {
  constructor (message, statusCode) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

class ValidationError extends AppError {
  constructor (message) {
    super(message, 400)
  }
}

class NotFoundError extends AppError {
  constructor (message) {
    super(message, 404)
  }
}

class UnauthorizedError extends AppError {
  constructor (message) {
    super(message, 401)
  }
}

class ForbiddenError extends AppError {
  constructor (message) {
    super(message, 403)
  }
}

function handleError (err, res) {
  if (err.isOperational) {
    res.status(err.statusCode).json({ error: err.message })
  } else {
    console.error('Unexpected Error:', err)
    res.status(500).json({ error: 'An unexpected error occurred' })
  }
}

export { AppError, ValidationError, NotFoundError, UnauthorizedError, ForbiddenError, handleError }
