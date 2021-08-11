# FieldNav Form Builder

## Overview
The Form Builder app allows a user to easily build and preview a custom form by using a low-code (or WYSIWYG) tool.

## Installation
1. Make sure that `npm` and `node.js` are installed globally on your system
2. Go to github and download the code from [this repo](https://github.com/zbeucler2018/FieldNavFormBuilder)
3. Once the code has downloaded, `cd` into that directory and type `npm install`
   - This will download all the needed libraries for the app
   - After running `npm install`, if the `node_modules` folder has not been added, then run this command `npm install bootstrap firebase just-clone reactstrap react-router-dom react react-dom`
4. Once the command has finished and the `node_modules` folder has been added to the directory, run `npm start` to start the app
5. Visit `http://localhost:3000/` to see the app

## Screens
### Login Screen
- The login screen is the screen that greets the user when the app is first started
- The purpose of this screen is to collect the name, company, form title, and time/date from the user
- The main component that controls this screen is `<MetaDataGenerator />`

The code for this screen can be found in `src/JsonGenerator/MetaDataGenerator.js`
### Select Screen
- The purpose of this screen is to display all the forms currently in the database, as well as provide a option to create a new form
- The main component for this screen is `<FormSelectionScreen />`

The code for this screen can be found in `src/FormSelectScreen/FormSelection.js`
### Create Screen
- The purpose of this screen is to diaplay the form builder application
- When the user finishes the form and submits it, the form is then sent to the firebase DB
- The main components for this screen are `<PayloadGenerator />`, `<UiGenerator />`, and `<FormItemLayout />`

The code for this screen can be found in `src/JsonGenerator/PayloadGeneratorClass.js`, `src/UiGenerator/UiGenerator.js` and `src/FormItemLayouts/FormItemLayout.js`

## Components
- `<MetaDataGenerator />`
- `<FormSelectionScreen />`
- `<PayloadGenerator />`
- `<UiGenerator />`
- `<FormItemLayout />`

## Libraries and their uses
### Reactstrap
- Reactstrap is the UI library I chose to use becasue it's based off of bootstrap and becasue a lot of the components from the library can be used in this project
- Read more about this library [here](https://reactstrap.github.io/)
### Firebase
- The database used for this app is the firebase firestore database
- The code for the initialization can be found in `src/Firebase/firestoreinit.js`
- Read more about Firestore [here](https://firebase.google.com/docs/firestore)
- By the time someone other than me is going to help develop this app, you must create your own Firebase Firestore database
- Replace my initalization code with your new code in `src/Firebase/firestoreinit.js`
- Read more about the Firebase JS SDK [here](https://www.npmjs.com/package/firebase)
### Just-Clone
- This library is used to deep copy complex data structures simply
- A lot of the important data stored as state in the app are complex objects
- Since it is bad practice to modify state directly, I use this library to make a copy of the complex state object, and then I modify the compy. Once I've finished modifying the copy, I replace the previous state with the modified copy
```javascript
// EX: In the updateFormTitle method in App.js
  updateFormTitle = (value) => {
    let updated = clone(this.state.formMetaData) // create a copy of the state object
    updated.FormTitle = value // modify that copy
    this.setState({ formMetaData: updated }) // replace old state with modified state
  }
```
- Read more about Just-Clone [here](https://www.npmjs.com/package/just-clone)
### React Router
- React router is used to transition from one screen to another
- This library also allows us to have cleaner code in our components becasue we dont have to worry about conditionally rendering the other components
- Read more about React Router [here](https://reactrouter.com/web/guides/quick-start)

## TODO
- [ ] Add MapBox and map functionalities
- [ ] Add an Edit screen where user can select a form in the DB and then view + edit that form 
- [ ] Add validation to important sections where user input is required
- [ ] Fix UI of the create screen to look like the figma 
- [ ] Add a FieldNav Navbar

## Links / Resources
































# Git Notes
- `Development` branch is for developing
- `main` branch is for stable versions
## Commands
- `git branch` gets current branch
- `git branch <branch_name>` moves to <branch_name>
### Push to current branch
- `git add .`
- `git commit -m "message"`
- `git push -u origin HEAD`

# NPM libraries
- `npm i firebase `

# Docker Notes
- `docker build -t <NAME> . ` to build continer
- `docker run <NAME>` to run container
- `docker push <NAME>` to push to repo
- `docker pull zbeucler/form_builder_web` to pull from repo
- `docker run --name form_builder_web -d -p 3000:3000 form_builder_web:latest` better run command?
- ` docker run -it -p 3000:3000 zbeucler/form_builder_web` run the container in interactive mode on port 3000
## Docker resources
- https://medium.com/geekculture/getting-started-with-docker-in-your-react-js-application-the-basics-6e5300cf749d
- https://www.youtube.com/watch?v=iqqDU2crIEQ&t=1002s

# Notes
```javascript
useEffect(() => {
   //your code
}, [data]);
```