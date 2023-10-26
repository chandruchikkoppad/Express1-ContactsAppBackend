const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

      switch (statusCode) {
        case 400:
          res.json({
            title: "Validation failed",
            msg: err.message,
            stackTrace: err.stack,
          });
          break;
        case 401:
          res.json({
            title: "Un-authorized_Error",
            msg: err.message,
            stackTrace: err.stack,
          });
          break;
        case 403:
          res.json({
            title: "Forbidden_Error",
            msg: err.message,
            stackTrace: err.stack,
          });
          break;
        case 404:
          res.json({
            title: "Not_Found",
            msg: err.message,
            stackTrace: err.stack,
          });
          break;
        case 500:
          res.json({
            title: "Server_Error",
            msg: err.message,
            stackTrace: err.stack,
          });
          break;
            default:
                  console.log("No Error, All good !");
          break;
      }
};
module.exports = errorHandler;