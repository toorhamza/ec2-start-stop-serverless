export const sendProxySuccess = (responseObj) => {
  const response =
    responseObj && responseObj.statusCode
      ? responseObj
      : {
          statusCode: 200,
          body: JSON.stringify(responseObj),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Credentials": true,
          },
        };
  return response;
};

export const sendProxyError = (err) => {
  console.log("ERROR:", err.stack || err);
  let status = 500;
  let message = err.message || JSON.stringify(err);
  const m = err.message && err.message.match(/^\[(\d+)\] *(.*)$/);
  if (m) {
    [, status, message] = m;
  }
  const response = {
    statusCode: status,
    body: JSON.stringify({ errorMessage: message }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
  return response;
};
