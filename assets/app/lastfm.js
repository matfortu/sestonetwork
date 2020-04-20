const axios = require("axios");

const BASE_URL = `http://ws.audioscrobbler.com/2.0/`

module.exports = {
    getInfo: (artist, track) => axios({
        method:"GET",
        url : BASE_URL,
        params: {
            method:'track.getInfo',
            api_key:process.env.API,
            artist:artist,
            track:track,
            autocorrect:1,
            format:'json'
        }
    })
}