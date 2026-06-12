"use strict";
module.exports.fnupsertcustomermaster = (req, res, next) => {
  let options = req.headers.options,
    db = options.db,
    p_customerid = req.body.p_customerid,
    p_customername = req.body.p_customername,
    p_customeraddress = req.body.p_customeraddress,
    p_customercountry = req.body.p_customercountry,
    p_customerstate = req.body.p_customerstate,
    p_customercity = req.body.p_customercity,
    p_customerpincode = req.body.p_customerpincode,
    p_customerphone = req.body.p_customerphone,
    p_customeremail = req.body.p_customeremail,
    p_customergstno = req.body.p_customergstno,
    p_customercontactperson = req.body.p_customercontactperson,
    p_customercontactphone = req.body.p_customercontactphone,
    p_customercontactemail = req.body.p_customercontactemail,
    p_isactive = req.body.p_isactive,
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
        ".fn_upsert_customer_master($1::int,$2::text,$3::text,$4::text,$5::text,$6::text,$7::text,$8::text,$9::text,$10::text,$11::text,$12::text,$13::text,$14::text,$15::text)",
      [p_customerid, p_customername, p_customeraddress, p_customercountry, p_customerstate, p_customercity, p_customerpincode, p_customerphone, p_customeremail, p_customergstno, p_customercontactperson, p_customercontactphone, p_customercontactemail, p_isactive ,p_username],
      (err, result) => {
        if (err) {
          console.log("The Error", err);
          response["success"] = false;
          response["message"] = err.message;
          return reject(response);
        } else {
          response["success"] = true;
          response["message"] = "data fetch";
          response["data"] = result.rows[0].fn_upsert_customer_master;
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
