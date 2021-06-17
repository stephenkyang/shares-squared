import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import unirest from "unirest";
export const main = handler(async (event, context) => {
  const id = event.requestContext.identity.cognitoIdentityId;

  const params = {
    TableName: "watchlists",
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": id,
    },
  };
  const result = await dynamoDb.query(params);
  if (!result) {
    throw new Error("No Watchlist with that name");
  }

  let items = result.Items;
  let allSymbols = new Set();
  for (let i = 0; i < items.length; i++) {
    items[i].symbols = items[i].symbols.values;
    items[i].symbols.forEach(symbol => allSymbols.add(symbol));
  }
  const symbolString = Array.from(allSymbols.values()).join(',');
  if (symbolString.length > 0) {
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
    const stockData = {};
    for (let result of res.body.quoteResponse.result) {
      stockData[result.symbol] = result;
    }
    for (let i = 0; i < result.Items.length; i++) {
      let newItems = [];
      for (let symbol of result.Items[i].symbols) {
        newItems.push(stockData[symbol]);
      }
      result.Items[i].symbols = newItems;
    }
  }
  console.log(result.Items);
  return result.Items;
});
