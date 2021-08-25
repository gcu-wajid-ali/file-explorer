# File Explorer 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#### Instructions: 
To run project:
 First start React app and open in browser, then run the node application by directory path.

## Folder Structure

In the project directory, there are 2 folders:
### 1) Node
### 2) React

# `React`
Open the React folder in the terminal
and run the following commands:
### `npm install` to install dependencies
### `npm start` to start project

\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

# `Node`
Open the Node folder in the terminal
and run the following commands:
### `npm install` to install dependencies
### `node app.js ../React` to start project

\
You need to give one or multiple directory `relative path` to app.js.

For example: 
1) `node app.js ../` will open Node, React and other files in the browser.
2) `node app.js ../ ../React` will open Node, React and other files in the browser one section and React in another below the section.

The default port for the node application is 80.

I used socket.io to detect change in file system and emit event based on that to update folder Structure on frontend

