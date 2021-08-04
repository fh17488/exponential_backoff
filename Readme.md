# Exponential Backoff using Lambda and SQS

Lambda is triggered by SQS. The visibility timeout on all received messages is set to twice the current value of the visibility timeout based on the value of the message attribute ApproximateReceiveCount. 
