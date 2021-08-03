# Questions
- What do I need name for in the form items? Can I remove it if they have uuids?

# ToDo
- [X] basic validation and requirements
- [X] fix css on payload btns
- [ ] change required to checkbox (payloadGen)
- [ ] Add bootstrap for Look? (alerts as input items)

# Current Components
- `<MetaDataGenerator />`
- `<PayloadGenerator />`
- `<UiGenerator />`
- `<FormItemLayout />`

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
- `npm i firebase react-map-gl react-mapbox-gl-geocoder`

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