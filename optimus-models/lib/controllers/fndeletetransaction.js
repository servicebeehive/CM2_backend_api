"use strict";
module.exports.fndeletetransaction = (req, res, next) => {
  let options = req.headers.options,
    db = options.db,
    p_type = req.body.p_type,
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
        ".fn_delete_transaction($1::text,$2::int,$3::text)",
      [p_type,p_transaction_id, p_username],
      (err, result) => {
        if (err) {
          console.log("The Error", err);
          response["success"] = false;
          response["message"] = err.message;
          return reject(response);
        } else {
          response["success"] = true;
          response["message"] = "data fetch";
          response["data"] = result.rows[0].fn_delete_transaction;
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
