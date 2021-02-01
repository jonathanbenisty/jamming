import React from 'react';
import TrackList from '../TrackList/TrackList';

import './Playlist.css';

import '../TrackList/TrackList';

class Playlist extends React.Component {
    render () {
        return(
            <div className="Playlist">
                <input defaultvalue= {'New Playlist'}/> 
                <TrackList tracks={this.props.playListTracks} />
                <button className="Playlist-save">SAVE TO SPOTIFY</button> 
            </div>
        )
    }
}

export default Playlist