let mysql = require("mysql");
let config = require("../config/config.js");

async function sqlQuery(query, bindValues) {
  const connection = mysql.createConnection(config.databaseOptions);
  connection.connect();

  let resultObject = {
    error: null,
    success: false,
    rows: null,
  };

  await new Promise((result, rejection) => {
    connection.query(query, bindValues, function (error, rows) {
      if (error) {
        rejection(error);
      }
      resultObject.rows = rows;
      resultObject.success = true;
      result(rows);
    });
  }).catch((error) => {
    resultObject.error = error;
    resultObject.success = false;
    throw new Error(error);
  });

  return resultObject;
}

async function sqlQueryMultiBind(query, bindValues) {
  const connection = mysql.createConnection(config.databaseOptions);
  connection.connect();

  let resultObject = {
    error: null,
    success: false,
    rows: null,
  };

  await new Promise((result, rejection) => {
    connection.query(query, [bindValues], function (error, rows) {
      if (error) {
        rejection(error);
      }
      resultObject.rows = rows;
      resultObject.success = true;
      result(rows);
    });
  }).catch((error) => {
    resultObject.error = error;
    resultObject.success = false;
    throw new Error(error);
  });
  return resultObject;
}

module.exports = { sqlQuery, sqlQueryMultiBind };
