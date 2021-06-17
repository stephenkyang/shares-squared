import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
export const main = handler(async (event, context) => {
  const id = event.requestContext.identity.cognitoIdentityId;
  const data = JSON.parse(event.body);
  const watchlist = data.watchlist;
  const params = {
    TableName: "watchlists",
    Key: {
      userId: id,
      watchlistId: watchlist,
    },
    UpdateExpression: "DELETE symbols :symbols",
    ExpressionAttributeValues: {
      ":symbols": dynamoDb.createSet(data.symbols) || null,
    },
  };
  const result =  await dynamoDb.update(params);
  return result;
});
