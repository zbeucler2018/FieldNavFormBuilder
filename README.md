# Questions
- What do I need name for in the form items? Can I remove it if they have uuids? ()
- Should I include these items as well? (multi-select, checkbox)
- Double check if bootstrap is ok with Christian bc it's opensource


# What to do next
- change required to checkbox (payloadGen)
- Add bootstrap for Look? (alerts as input items)
- change dropdownsingle from just text area to multiple text inputs 

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
- `npm i firebase`

# Notes
```javascript
useEffect(() => {
   //your code
}, [data]);
```