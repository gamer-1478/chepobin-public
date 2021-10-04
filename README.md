# Chepobin

Chepobin website For HacktoberFest Is Live At [chepobin-public.herokuapp.com](https://chepobin-public.herokuapp.com).

This project Uses [Svelte](https://svelte.dev), [Node.js](https://nodejs.org/en/), [Express.js](https://expressjs.com/) and [Firebase](https://firebase.google.com/).

```bash
npx degit sveltejs/template svelte-app
cd svelte-app
```

## Contribution Guidelines 🏗

Are there any missing features which we can add to make it the best snippet sharing service? or you are here just to help out with the issues (see issues) or to contribute towards hacktoberfest 2021, well welcome!
To start contributing, follow the below guidelines:

```
  D:\xyz_folder> git clone git@github.com:gamer-1478/chepobin-public.git
  D:\xyz_folder> cd chepobin-public
  D:\xyz_folder\chepobin-public>npm install
```

#####This runs the app in test mode.

```
D:\xyz_folder\chepobin-public>nodemon --exec "npm run build && npm run start" --ignore public/build
```

You're done! Now you can help with the issues (issues tab and also the issues file) or maybe even add some sections (team section or missions etc) and after accepting the PR
It'll be counted as your contribution to open source and for hacktoberfest in the month of october! <i>Thanks for coming!</i> Do star it & follow my github if you liked the project and for tons of other projects!

## Deployment methods:

1.  **_Deploy Forked repository (Heroku)_**

    - First fork the repository.
    - Login to your heroku account.
    - Create new app & give a name.
    - Connect your GitHub account to heroku.
    - Search the repo you want to deploy and then deploy.

2.  **_Deploy local repository (Heroku)_**

    - Prerequisites : Heroku cli
    - First make a new app on heroku & give a name.
    - Clone the repository to your local system.
    - Login to your heroku account:

    ```
    heroku login
    ```

    - Set git remote repository to heroku:

    ```
    heroku git:remote -a <appName you created earlier>
    ```

    - Add Files To git:

    ```
    git add .
    ```

    - Commit all changes:

    ```
    git commit -m "awesome work"
    ```

    - Push the branch to heroku that you want to deploy:

    ```
    git push heroku master
    ```
