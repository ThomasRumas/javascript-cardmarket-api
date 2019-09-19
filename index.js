const request = require('request');
const URI = 'https://api.cardmarket.com/ws/v2.0/output.json';

class CardMarketApi {
    /**
     * 
     * @param {String} APP_TOKEN 
     * @param {String} APP_SECRET 
     * @param {String} ACCESS_TOKEN 
     * @param {String} ACCESS_SECRET 
     */
    constructor(APP_TOKEN, APP_SECRET, ACCESS_TOKEN, ACCESS_SECRET) {
        this.APP_TOKEN = APP_TOKEN; 
        this.APP_SECRET = APP_SECRET; 
        this.ACCESS_SECRET = ACCESS_SECRET; 
        this.ACCESS_TOKEN = ACCESS_TOKEN;
    }
    
    getGames() {
        const oauthParameters = {
            realm: `${URI}/games`,
            consumer_key: this.APP_TOKEN,
            consumer_secret: this.APP_SECRET,
            token: this.ACCESS_TOKEN,
            token_secret: this.ACCESS_SECRET
        };
        return new Promise((resolve, reject) => {
            request.get(oauthParameters.realm, { oauth: oauthParameters }, (error, response) => {
                if(error) {
                    throw error; 
                } else if(response.statusCode !== 200) {
                    throw JSON.stringify({
                        statusCode: response.statusCode,
                        statusMessage: response.statusMessage
                    });
                }
                try {
                    resolve(response.body);
                } catch (error) {
                    reject(error); 
                }
            })
        });         
    }

    /**
     * 
     * @param {Integer} prmGame id of the game
     */
    getExpansions(prmGame) {
        const oauthParameters = {
            realm: `${URI}/games/${prmGame}/expansions`,
            consumer_key: this.APP_TOKEN,
            consumer_secret: this.APP_SECRET,
            token: this.ACCESS_TOKEN,
            token_secret: this.ACCESS_SECRET
        };
        return new Promise((resolve, reject) => {
            request.get(oauthParameters.realm, { oauth: oauthParameters }, (error, response) => {
                if (error) {
                    throw error;
                } else if (response.statusCode !== 200) {
                    throw JSON.stringify({
                        statusCode: response.statusCode,
                        statusMessage: response.statusMessage
                    });
                }
                try {
                    resolve(response.body);
                } catch (error) {
                    reject(error);
                }
            })
        });
    }  
    
    /**
     * 
     * @param {Integer} prmExpansion id of the expansion
     */
    getExpansionsCardsList(prmExpansion) {
        const oauthParameters = {
            realm: `${URI}/expansions/${prmExpansion}/singles`,
            consumer_key: this.APP_TOKEN,
            consumer_secret: this.APP_SECRET,
            token: this.ACCESS_TOKEN,
            token_secret: this.ACCESS_SECRET
        };
        return new Promise((resolve, reject) => {
            request.get(oauthParameters.realm, { oauth: oauthParameters }, (error, response) => {
                if (error) {
                    throw error;
                } else if (response.statusCode !== 200) {
                    throw JSON.stringify({
                        statusCode: response.statusCode,
                        statusMessage: response.statusMessage
                    });
                }
                try {
                    resolve(response.body);
                } catch (error) {
                    reject(error);
                }
            })
        });
    }

    /**
     * 
     * @param {Integer} prmProduct id of the product you want 
     */
    getProductDetails(prmProduct) {
        const oauthParameters = {
            realm: `${URI}/products/${prmProduct}`,
            consumer_key: this.APP_TOKEN,
            consumer_secret: this.APP_SECRET,
            token: this.ACCESS_TOKEN,
            token_secret: this.ACCESS_SECRET
        };
        return new Promise((resolve, reject) => {
            request.get(oauthParameters.realm, { oauth: oauthParameters }, (error, response) => {
                if (error) {
                    throw error;
                } else if (response.statusCode !== 200) {
                    throw JSON.stringify({
                        statusCode: response.statusCode,
                        statusMessage: response.statusMessage
                    });
                }
                try {
                    resolve(response.body);
                } catch (error) {
                    reject(error);
                }
            })
        });
    }

    /**
     * 
     * @param {Integer} prmProduct id of the product you want
     * @param {Object} prmQueryParameters see Cardmarket API Documentation to know which params that can be use.
     */
    searchProductOnMarket(prmProduct, prmQueryParameters = {}) {
        let parameters = {
            start: 0, 
            maxResults: 100,
            idLanguage: 2,
            minCondition: 'EX'
        }
        if(Object.keys(prmQueryParameters).length !== 0) {
            parameters = prmQueryParameters; 
        }
        const oauthParameters = {
            realm: `${URI}/articles/${prmProduct}`,
            consumer_key: this.APP_TOKEN,
            consumer_secret: this.APP_SECRET,
            token: this.ACCESS_TOKEN,
            token_secret: this.ACCESS_SECRET
        };
        return new Promise((resolve, reject) => {
            request.get(oauthParameters.realm, { oauth: oauthParameters, qs: parameters }, (error, response) => {
                if (error) {
                    throw error;
                } else if (response.statusCode !== 200 && response.statusCode !== 206) {
                    throw JSON.stringify({
                        statusCode: response.statusCode,
                        statusMessage: response.statusMessage
                    });
                }
                try {
                    resolve(response.body);
                } catch (error) {
                    reject(error);
                }
            })
        });
    }
}

export default CardMarketApi; 