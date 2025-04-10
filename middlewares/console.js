export const consoleMiddleware = (req, _, next) => {
  console.log('---------------------------------Request---------------------------------')
  console.log('URL: ', req.url)
  console.log('Method: ', req.method)
  console.log('Headers: ', req.headers)
  console.log('Body: ', req.body)
  console.log('-------------------------------------------------------------------------')
  next()
}
