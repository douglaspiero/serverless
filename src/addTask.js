const { v5 } = require('uuid')
const AWS = require('aws-sdk')

const addTask = async (event) => {

    // Connect DynamoDB
    const dynamodb = new AWS.DynamoDB.DocumentClient()

    const { title, description } = JSON.parse(event.body)
    const createAt = new Date()
    const id = v5()

    const newTask = {
        id,
        title,
        description,
        createAt
    }

    await dynamodb
    .put({
        TableName: 'TaskTable',
        Item: newTask
    }).promise()

    return {
        statusCode: 200,
        body: JSON.stringify(newTask),
    }
};

module.exports = {
    addTask,
};