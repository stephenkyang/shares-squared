import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);

  const name = data.name;
  const id = event.requestContext.identity.cognitoIdentityId;

  const params = {
    TableName: "watchlists",
    Item: {
        userId: id,
        watchlistId: name,
        symbols: dynamoDb.createSet([""]),
    }
  };

  await dynamoDb.put(params);
  return params.Item;

});
