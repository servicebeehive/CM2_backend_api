"use strict";
module.exports.fndeletetransactionmisc = (req, res, next) => {
  let options = req.headers.options,
    db = options.db,
    p_transaction_id = req.body.p_transaction_id,
    p_username = req.body.p_username,
    clientschema = req.headers.options.db.clientdb,
    response = {
      success: false,
      message: "",
    };
  console.log("The body is", clientschema);

  return new Promise((resolve, reject) => {
    db.query(
      "select " +
        clientschema +
        ".fn_delete_transaction_misc($1::int,$2::text)",
      [p_transaction_id, p_username],
      (err, result) => {
        if (err) {
          console.log("The Error", err);
          response["success"] = false;
          response["message"] = err.message;
          return reject(response);
        } else {
          response["success"] = true;
          response["message"] = "data fetch";
          response["data"] = result.rows[0].fn_delete_transaction_misc;
          return resolve(response);
        }
      },
    );
  })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(200).json(response);
    });
};
