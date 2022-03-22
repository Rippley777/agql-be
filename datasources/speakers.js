const {RESTDataSource}  = require('apollo-datasource-rest');

class SpeakerApi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:4002/speakers';
    }
    async getSpeakerById(id) {
        const data = await this.get(`/${id}`);
        return data;
    }
    async getSpeakers() {
        const data = await this.get('/');
        return data;
    }
}

module.exports = SpeakerApi;