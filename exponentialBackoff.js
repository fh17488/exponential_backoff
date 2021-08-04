'use strict';
const AWS = require('aws-sdk');
const sqs = new AWS.SQS();

module.exports.handler = async (event, context) => {
  let successful = false;

  for (let record of event.Records) {
    //successful = Math.random() <= 0.5;
    try {
      if (successful) {
        return {
          statusCode: 200,
          body: JSON.stringify(
            {
              message: 'successfull!',
              input: event,
            },
            null,
            2
          ),
        };
      }
      else
        throw 'Failed!';
    } catch (err) {
      let result = await sqs.getQueueUrl({ QueueName: "InputQueue"}).promise();
      let visibilityTimeout = Math.pow(2,record.attributes.ApproximateReceiveCount - 1) * 90;
      let receiptHandle = record.receiptHandle;
      await sqs.changeMessageVisibility({ QueueUrl: result.QueueUrl, ReceiptHandle: receiptHandle, VisibilityTimeout: visibilityTimeout }).promise();
      throw 'error';
    }
  }
}

