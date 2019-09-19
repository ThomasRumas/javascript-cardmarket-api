# javascript-cardmarket-api
A little API to consume cardmarket API

##How to use it
```
import CardmarketApi from 'index.js'; 

let api = new CardmarketApi(APP_TOKEN, APP_SECRET, ACCESS_TOKEN, ACCESS_SECRET);

api.getGames().then(response => {
    console.log(response); 
})
```