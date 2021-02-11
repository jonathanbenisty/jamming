import SearchBar from "../Components/SearchBar/SearchBar";
import hash from "./hash"
const clientID = 'e8334f47c0b44466850eb9beff1f3444';
const redirectUri = 'http://localhost:3000/';
let accessToken;

const Spotify = {
    token: null,

    getAccessToken() {
        if (this.token) {
            return this.token;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*=)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*=)/);

        if (accessTokenMatch && expiresInMatch) {
            console.info("accessToken1")

            this.token = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => this.token = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }

        console.log(this.token)
        return this.token

    },

    search(term) {
        const token = Spotify.getAccessToken();

        console.info(`Bearer ${this.token}`, term)
        return fetch(`https://api.spotify.com/v1/search?limit=50&type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            }

            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
                imageUrl: track.album.images[2].url
            }));
        });
    },

    savePlaylist(name, trackUris) {

        if (!name || !trackUris.length) {
            return Promise.resolve();
        }
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userId;

        return fetch('https://api.spotify.com/v1/me', { headers: headers }).then(response => response.json()).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ name: name })
            }).then(response => response.json()).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks
                `,

                    {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({ uris: trackUris })

                    })
            })
        })
    }

}

export default Spotify