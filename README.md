# Chepobin

Chepobin website For HacktoberFest Is Live At [chepobin.tk](https://chepobin.tk).

This is a project template for [Svelte](https://svelte.dev) apps. It lives at https://github.com/sveltejs/template.

To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit sveltejs/template svelte-app
cd svelte-app
```

*Note that you will need to have [Node.js](https://nodejs.org) installed.*


## Get started

#### Go to firebase and make a new app, paste the creds in firebase.js

Install the dependencies...

```bash
cd chepobin-public
npm install
```

...then start using 

```bash 
nodemon --exec "npm run build && npm run start" --ignore public/build
```

As the app uses server.js to serve, you need to build before serving. 

Navigate to [localhost:5002](http://localhost:5002). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

If you're using [Visual Studio Code](https://code.visualstudio.com/) we recommend installing the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode). If you are using other editors you may need to install a plugin in order to get syntax highlighting and intellisense.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [Node.js](https://nodejs.org), which is included in your package.json's `dependencies` to serve a server.js so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).