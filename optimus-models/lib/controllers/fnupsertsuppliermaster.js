"use strict";
module.exports.fnupsertsuppliermaster = (req, res, next) => {
  let options = req.headers.options,
    db = options.db,
    p_supplierid = req.body.p_supplierid,
    p_suppliername = req.body.p_suppliername,
    p_supplieraddress = req.body.p_supplieraddress,
    p_suppliercountry = req.body.p_suppliercountry,
    p_supplierstate = req.body.p_supplierstate,
    p_suppliercity = req.body.p_suppliercity,
    p_supplierpincode = req.body.p_supplierpincode,
    p_supplierphone = req.body.p_supplierphone,
    p_supplieremail = req.body.p_supplieremail,
    p_suppliergstno = req.body.p_suppliergstno,
    p_suppliercontactperson = req.body.p_suppliercontactperson,
    p_suppliercontactphone = req.body.p_suppliercontactphone,
    p_suppliercontactemail = req.body.p_suppliercontactemail,
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
        ".fn_upsert_supplier_master($1::int,$2::text,$3::text,$4::text,$5::text,$6::text,$7::text,$8::text,$9::text,$10::text,$11::text,$12::text,$13::text,$14::text,$15::text)",
      [p_supplierid, p_suppliername, p_supplieraddress, p_suppliercountry, p_supplierstate, p_suppliercity, p_supplierpincode, p_supplierphone, p_supplieremail, p_suppliergstno, p_suppliercontactperson, p_suppliercontactphone, p_suppliercontactemail, p_isactive ,p_username],
      (err, result) => {
        if (err) {
          console.log("The Error", err);
          response["success"] = false;
          response["message"] = err.message;
          return reject(response);
        } else {
          response["success"] = true;
          response["message"] = "data fetch";
          response["data"] = result.rows[0].fn_upsert_supplier_master;
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
