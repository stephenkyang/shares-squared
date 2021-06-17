import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const id = event.requestContext.identity.cognitoIdentityId;
  const watchlist = data.watchlist;
  const symbols = data.symbols;
  const params = {
    TableName: "watchlists",
    Key: {
      userId: id,
      watchlistId: watchlist,
    },
    UpdateExpression: "ADD symbols :symbols",
    ExpressionAttributeValues: {
      ":symbols": dynamoDb.createSet(data.symbols) || null,
    },
  };
  await dynamoDb.update(params);
  return {symbols};
});
