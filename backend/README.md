## Installation
https://serverless.com/framework/docs/providers/aws/guide/installation/
`npm install`


## Development
`serverless offline`
Requests go to localhost:3001
Options for the serverless.yml endpoint https://serverless.com/framework/docs/providers/aws/guide/serverless.yml/

## Adding authentication (pain in the butt the first time)
https://serverless.com/framework/docs/providers/aws/events/apigateway/#http-endpoints-with-custom-authorizers
http://docs.aws.amazon.com/apigateway/latest/developerguide/use-custom-authorizer.html

## Issues
Due to AWS resource limitations you can usually only make about 50-60 APIs using serverless, you have to get fancy after that.
