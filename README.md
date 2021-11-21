# How to Play Minesweepers Game

Minesweepers is a game of logic whereby you are required to properly spot all the locations in the minefields where a bomb has been buried and put a red flag on it. You **WIN** by placing flags in all the locations where the is a bomb (locations are denoted by a cell in the grid).

For ease of helping you knowing the number of bombs in the minefield, you will find a number close to flag at the top of your grid. Once you start to place flags in the cells, you will notice the number reducing.

**`Be careful`** not to exhaust all your flags as you would not be able to remove once you exhaust all of them and you have not won. But you can always remove the flags if you have not yet exhausted all of them.

Note: The number of bombs and number of flags you will have available will depend on the level of that you have chosen, whether `Beginner, Medium or Expert`

Below are the rules of the Game;

## Rules of Minesweepers Game

The game has some rules that needs to be followed for you to WIN. Otherwise, the Game would be Over and you will loose!!

1. Put a flag in all the cells that you think there is a bomb for you to win. Once you put the flags in all the correct cells (i.e. all the cells with a Bomb) you will win the Game! To put a flag on a cell "right click on that cell". You can also hold "control" and click/left click to do the same. You can also remove a flag in a cell by right clicking on that cell with a flag **BUT** only if you have not exhausted all the Flags, otherwise you will not be able to remove a flag if you exhaust all of them (Refer to Rule No. 6 below for further details)
2. **Do not click on a cell with a bomb** (if you a using trackpad it is a click, whereas if you are using a mouse, do not left click on a cell with bomb). You would need to guess correctly to only click on cells with no bombs in them. Once you click on a cell with no bomb, it will show the number of surrounding cells with bombs to give you some hint and guidance. A further bonus is where you click a cell with no surrounding cells with a bomb, it will recursively unveil all the surrounding cells up to the point where there it hits cells with surrounding bombs (see Rule No. 4 below for further details on this).
3. Once you click on a cell with Bomb, the game will be over and all the cells with Bombs will be displayed. You will no longer be able to continue playing the game. You may restart the game to play again!
4. If you click on a cell with no surrounding bombs, all the surrounding cells will unveil (in a recursive manner) until it reaches the edges of cells with at least one surrounding bomb, then it will stop. This will give you an advantage in progressing to identify the cells with bombs as it will significantly reduce the number of cells that you will have to guess upon and also give you some idea of where the bombs are.
5. The number of flags you have is stated at the top of the grid. Use these flags carefully since you don't have any other flags to use.
6. Note: if you exaust all the flag and you have not won the game you can no longer remove them from where you have placed them hence you will only resort to restarting the game. Hence be careful in putting the flags, don't just place them randomly.

# How to install and run the game on your local machine

This application has been build with React (you can read further below in the section titled: Getting Started with Create React App).

To run this project on your local environment and play the Minesweepers game, follow the following steps.

1. Clone this repo or download the zip file in your machine.
2. Through the command line, navigate to the downloaded folder (you may need to unzip it if you have gone with the download option) and run **`npm install`** to install the project dependancies and libraries in your local machine.
3. Once it has completed the installation, then run `npm start` to runs the app in the browser. \
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

4. Remember to read the instructions of the game above for you to WIN! You can also click on the `Get Help` button when playing to refresh your memory on the rules of the game.
5. Enjoy the Game!!

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
