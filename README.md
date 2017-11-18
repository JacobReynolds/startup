/backend will be the backend code, this is using the Serverless framework.  Since it's setup with offline mode you don't need to worry about setting up the AWS cli and creds and such.

/frontend will be the frontend.  This part is confusing so here's some docs.  Ask if you have questions.
  https://reactjs.org/tutorial/tutorial.html (We don't use "state", that's what redux is for).
  https://redux.js.org/docs/introduction/ this is the state manager

See the readme in the relevant folders for more info.

The example app will allow you take go to the test page, add multiple inputs, and submit all the data from those inputs to an API endpoint.  Look at the server console to see the submitted data, as well as the javascript console for more info.
