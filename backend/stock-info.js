import unirest from "unirest";

import handler from "./libs/handler-lib";

export const main = handler(async (event, context) => {
  const data = event.queryStringParameters;
  const symbolString = data.symbols;

  var req = unirest("GET", "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes");

  req.query({
    "region": "US",
    "symbols": symbolString,
  });
  req.headers({
    "x-rapidapi-key": "9cd96d5e9fmshaf93b821f7ee83cp148371jsn0ad58e64259a",
    "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
    "useQueryString": true
  });

  const res = await req.send();
  if (res.error) throw new Error(res.error);
  console.log(res.body);
  return res.body;
});
