const request = require('request');
const URI = 'https://api.cardmarket.com/ws/v2.0/output.json';

interface oauthParameters {
    realm?: string
    consumer_key: string
    consumer_secret: string
    token: string
    token_secret: string
}

class CardMarketApi {
    private APP_TOKEN: string;
    private APP_SECRET: string;
    private ACCESS_SECRET: string;
    private ACCESS_TOKEN: string;
    private oauthParameters: oauthParameters;

    /**
     * 
     * @param {String} APP_TOKEN 
     * @param {String} APP_SECRET 
     * @param {String} ACCESS_TOKEN 
     * @param {String} ACCESS_SECRET 
     */
    constructor(APP_TOKEN: string, APP_SECRET: string, ACCESS_TOKEN: string, ACCESS_SECRET: string) {
        this.APP_TOKEN = APP_TOKEN; 
        this.APP_SECRET = APP_SECRET; 
        this.ACCESS_SECRET = ACCESS_SECRET; 
        this.ACCESS_TOKEN = ACCESS_TOKEN;
        this.oauthParameters = {
            consumer_key: this.APP_TOKEN,
            consumer_secret: this.APP_SECRET,
            token: this.ACCESS_TOKEN,
            token_secret: this.ACCESS_SECRET
        }
    }

    /**
     * 
     * @param {object} prmParameters query parameters
     */
    private doGetRequest(prmParameters: object = {}) {
        return new Promise((resolve, reject) => {
            request.get(this.oauthParameters.realm, { oauth: this.oauthParameters, qs: prmParameters }, (error, response) => {
                if (!error && response.statusCode == 200) {
                    resolve(response.body);
                } else {
                    reject(error);
                }
            });
        });
    }

    public async getGames() {
        this.oauthParameters.realm = `${URI}/games`;
        try {
            const results= await this.doGetRequest(); 
            return results;
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * 
     * @param {BigInteger} prmGame id of the game
     */
    public async getExpansion(prmGame: BigInteger) {
        this.oauthParameters.realm = `${URI}/games/${prmGame}/expansions`;
        try {
            const results= await this.doGetRequest(); 
            return results;
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * 
     * @param {BigInteger} prmExpansion id of the expansion
     */
    public async getExpansionsCardsList(prmExpansion: BigInteger) {
        this.oauthParameters.realm = `${URI}/expansions/${prmExpansion}/singles`;
        try {
            const results= await this.doGetRequest(); 
            return results;
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * @param {BigInteger} prmProduct id of the product you want 
     */
    public async getProductDetails(prmProduct: BigInteger) {
        this.oauthParameters.realm = `${URI}/products/${prmProduct}`;
        try {
            const results= await this.doGetRequest(); 
            return results;
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * 
     * @param {BigInteger} prmProduct id of the product you want
     * @param {Object} prmQueryParameters see Cardmarket API Documentation to know which params that can be use.
     */
    public async searchProductOnMarket(prmProduct: BigInteger, prmQueryParameters: Object = {}) {
        let defaultParameters: Object = {
            start: 0, 
            maxResults: 100,
            idLanguage: 2,
            minCondition: 'EX'
        };

        let parameters: Object; 
        if(Object.keys(prmQueryParameters).length !== 0) {
            parameters = prmQueryParameters;
        } else {
            parameters = defaultParameters;
        }

        this.oauthParameters.realm = `${URI}/articles/${prmProduct}`;
        try {
            const results= await this.doGetRequest(parameters); 
            return results;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = CardMarketApi;