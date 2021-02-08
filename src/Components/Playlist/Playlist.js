import React from 'react';
import TrackList from '../TrackList/TrackList';

import './Playlist.css';

import '../TrackList/TrackList';

class Playlist extends React.Component {
    constructor(props) {
        super(props)
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event) {
        this.props.onNameChange(event.target.value);

    }


    render () {
        return(
            <div className="Playlist"> NEW PLAYLIST
                <input defaultvalue= {'New Playlist'}
                onChange={this.handleNameChange}
        
                /> 
                <TrackList tracks={this.props.playListTracks}
                 onRemove={this.props.onRemove}
                 isRemoval = {true}
                />
                <button className="Playlist-save"
                        onClick={this.props.onSave}
                >SAVE TO SPOTIFY</button> 
            </div>
        )
    }
}

export default Playlist