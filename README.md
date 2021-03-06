# Rebricable client

Sample rebricable.com client

### Demo
See it [live](https://psea.github.io/rebrickable/) &#127881;

### Conventions
 - Use modern React with hooks
 - style with styled-components
 - Component props typified by interface `<ComponentName>Props` for documentation purposes

### Dependencies
 - Axios
 - React-router

## Build instructions
### Environment variables
API Authorization key is set with REACT_APP_AUTH_KEY environment variable

To define permanent environment variables, create a file called .env in the root of the project [more info](https://create-react-app.dev/docs/adding-custom-environment-variables)

## Code walkthrough
### Component hierarchy
- `<App>` - top level component. Sets the routes for two views
  - `<Overview>` - overview page. Theme selector and sets list for the selected theme
    - `<ThemeSelect>` - theme selector. Dropdown themes list
    - `<LegoSetsList>` - list of lego sets
  - `<LegoSetDetails>` - details about a set

Components are self-contained with little shared state. 

State flow - list of theme ids - from `<ThemeSelect>` to `<LegoSets>`

Shared state in web storage - "liked" status of a set. Updates in `<LegoSetDetails>`

### Auxiliary functions
`rebricable.ts` - types for REST API and convenience functions
`user.ts` - user state. currently only whenever he likes a set
`useCachedWebStorage.ts` - hook similar to `useState` but state is persistant across component life cycles

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can???t go back!**

If you aren???t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you???re on your own.

You don???t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn???t feel obligated to use this feature. However we understand that this tool wouldn???t be useful if you couldn???t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
