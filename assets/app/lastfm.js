const axios = require("axios");
const dotenv = require('dotenv');

dotenv.config();

const BASE_URL = `http://ws.audioscrobbler.com/2.0/`

module.exports = {
    getInfo: (artist, track) => axios({
        method:"GET",
        url : BASE_URL,
        params: {
            method:'track.getInfo',
            api_key: '91b272b7f8b6fc938dd829d05d65554c',
            artist:artist,
            track:track,
            autocorrect:1,
            format:'json'
        }
    })
}