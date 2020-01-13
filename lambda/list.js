import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export const main = async event => {
    const params = {
        TableName: process.env.tableName,
        KeyConditionExpression: "userId = :userId", //only returns items with matching userId partition key
        ExpressionAttributeValues: {
            ":userId": event.requestContext.identity.cognitoIdentityId //defines the value in the condition :userId
        }
    };

    try {
        const result = await dynamoDbLib.call("query", params);
        return success(result.Items);
    } catch (e) {
        return failure({ status: false });
    }
};