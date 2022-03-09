import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient";

export const handler: APIGatewayProxyHandler = async (event) => {
    const { userid } = event.pathParameters

    const todos = await document.query({
        TableName: "todos",
        IndexName: "userid_index",
        KeyConditionExpression: "user_id = :userid",
        ExpressionAttributeValues: {
            ":userid": userid
        }
    }).promise()

    return {
        statusCode: 200,
        body: JSON.stringify(todos)
    }
}