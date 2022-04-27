# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

## Running the app

```
git clone https://github.com/sirLani/PokemonApp_RJs.git
cd pokemon_rjs
```

If you can't get the setup script to work, then just make sure you have the
right versions of the requirements listed above, and run the following commands:

```
npm install

```

To get the app up and running (and really see if it worked), run:

```shell
npm start
```

Runs the app in the development mode.\
Open [http://localhost:4000](http://localhost:4000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

I had to change the port to :4000 because i used local storage to persist the favourite pokemons, and as a result of this it would give an error if a port :3000 is used and and it has storage in it already

## Running the tests

```shell
npm test
```

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Dependencies

React testing library was used for testing, for easy testing and to avoid writing too much code
React Query: For state management

## Hosting

it was deployed on Netlify and can be accessed using this link
https://poki-task.netlify.app/

### Challenges

I had a couple of challenges for instance:
trying to make multiple API calls after the first call was made was a challenges, First i was unable to on a particular process, of if i should loop through it or use a promise.All call. I finally settled on loopinng through the response gotten and setting it all in an array.

Secondly: I used React Query for the API call, because it would help with CACHE and help to manage state and make the API call on APP render. I had read about it and i know it would be the best to solve this challenge, although it was my first time implementing it and it was a bit challenging, i had a couple of challenges while i was trying to use the same function to display all Pokemons and at the same time query a search on it.. I solved this by separating the search into a different component and lifting state up to render onces it has been invocked

Thirdly:

Switching between pages to view more pokemons was a little challenging because i needed to implement it so that i can always view them on a new page, so i used a USEPARAM hook and incremented the screens by 1, so that on click of the next button i can open a new screen and a new list of pokemons can be loaded

Fourth:

Persisting the favourites, I had to store the favorites in local storage which is not a good call and i used it to persist the user options and also to display this in the favorites screen.. to ensure this works seamlesly, i had to ensure that nothing was stored in the local storage

Fifth: I had challenges during testing and i could not do more tests, i was able to achieve a few, but if given more time i would work on this

## If i Had more time

If i had more time, i would like to do more on the testing aspect of it, I want to use MSW to mock the API for testing, because it would help to bridge some errors like what if a PUT request was made to the endpoint rather than a GET request, then there is no way to differentiate between the two.

I also want to write more integration tests

I would also like to create a subscription aspect of it, so that a user can register and a database can be set to store the users favourites, by using Firebase for example

I would also write it in typescript

## Extra features

I made it possible to like and unlike pokemons
