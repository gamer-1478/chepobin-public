# Chepobin

Chepobin website For HacktoberFest Is Live At [chepobin-public.herokuapp.com](https://chepobin-public.herokuapp.com).

This project Uses [Svelte](https://svelte.dev), [Node.js](https://nodejs.org/en/), [Express.js](https://expressjs.com/) and [Firebase](https://firebase.google.com/).

```bash
npx degit sveltejs/template svelte-app
cd svelte-app
```

## DataBase

This project uses firebase firestore database, whose creds are already provided in env for easy use. Please note, this database is a new one and is in no way linked to chepobin.tk app database. This Projects database, is also [visually avaialable](https://firestore-data-visualiser.herokuapp.com/) using my other project called [firestore data visualiser](https://github.com/gamer-1478/Firestore-data-visualiser).

## Contribution Guidelines 🏗

Are there any missing features which we can add to make it the best snippet sharing service? or you are here just to help out with the issues (see issues) or to contribute towards hacktoberfest 2021, well welcome!
To start contributing, follow the below guidelines:

```
  D:\xyz_folder> git clone git@github.com:gamer-1478/chepobin-public.git
  D:\xyz_folder> cd chepobin-public
  D:\xyz_folder\chepobin-public> npm install
```

#### This runs the app in test mode.

```
D:\xyz_folder\chepobin-public> npm run dev
```

#### Start The App In Production Using.

```
D:\xyz_folder\chepobin-public> npm run build && npm start
```

You're done! Now you can help with the issues (issues tab and also the issues file) or maybe even add some sections (team section or missions etc) and after accepting the PR It'll be counted as your contribution to open source and for hacktoberfest in the month of october!

Do star the repo if you liked the project & follow my github for tons of other projects!

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

This ReadMe Template was Orignally made By [Pulkithanda](https://github.com/pulkithanda)
