# infinite-scroll

A full stack app that calls the Itunes Search API and presents results using an infinite scroller component.

The scroller shows 10 results at a time and loads more as the user scrolls down.

Uses [Redux Toolkit](https://redux-toolkit.js.org/) to store search results in the client.

## Dependencies

Make sure you have the following installed:

- [Node](https://nodejs.org/en/)

## Installation and running locally

```sh
cd client && npm install
cd ../server && npm install
npm run dev
```

## Production build

```sh
cd client && npm run build
cd ../server && npm run build
npm start
```
