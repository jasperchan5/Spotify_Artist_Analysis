import express from 'express'
import dotenv from 'dotenv-defaults';
import SpotifyWebApi from 'spotify-web-api-node';
import request from 'request';
const router = express.Router();

dotenv.config();

const client_id = 'ecee31ecc40b4cbeaa9a484cf222bb59'; // Your client id
const client_secret = '2f66f50359254ac79d91470b9d50d9e3'; // Your secret
const redirect_uri = 'http://localhost:8080'; // Your redirect uri
var token = ""

var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };
  
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
        token = body.access_token;
    }
  });

// credentials are optional
const spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: redirect_uri
});


router.get('/getArtist', async(req,res) => {
    const artistName = req.query.artistName;
    spotifyApi.setAccessToken(token);
    const artistData = await spotifyApi.search(artistName,['artist']);
    const data = artistData.body.artists.items.slice(0,3);
    console.log(data);
    res.status(200).send({artistInfo: data});
})

router.get('/getTracks', async(req,res) => {
    const artistID = req.query.artistID;
    spotifyApi.setAccessToken(token);
    const tracks = await spotifyApi.getArtistTopTracks(artistID, 'US');
    res.status(200).send({topTracks: tracks.body.tracks});
})

export default router;