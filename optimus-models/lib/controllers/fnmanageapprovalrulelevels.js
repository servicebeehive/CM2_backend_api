"use strict";
module.exports.fnmanageapprovalrulelevels = (req, res, next) => {
  let options = req.headers.options,
    db = options.db,
    p_rule_id = req.body.p_rule_id,
    p_rule_creation_id = req.body.p_rule_creation_id,
    p_levels = JSON.stringify(req.body.p_levels),
    p_created_by = req.body.p_created_by,
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
        ".fn_manage_approval_rule_levels($1::int,$2::int,$3::jsonb,$4::int)",
      [p_rule_id, p_rule_creation_id, p_levels, p_created_by],
      (err, result) => {
        if (err) {
          console.log("The Error", err);
          response["success"] = false;
          response["message"] = err.message;
          return reject(response);
        } else {
          response["success"] = true;
          response["message"] = "data fetch";
          response["data"] = result.rows[0].fn_manage_approval_rule_levels;
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
