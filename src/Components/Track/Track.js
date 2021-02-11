import React from 'react';

import './Track.css';

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }
    
    renderAction() {
          if(this.props.isRemoval) {
              return <button className="Track-action"
              onClick={this.removeTrack}
              >-</button>
          } else {
              return <button className="Track-action"
              onClick={this.addTrack}
              isRemoval={true}
              >+</button>
          }
    };
    
    
    
    render () {

        return(
            <div className="Track">
               
                <div className="Track-information">
                    <div className="track-items">
                        <img className="album-image" src={this.props.track.imageUrl} />
                    <div className="name-artist">
                        <h3>{this.props.track.name}</h3>
                        <p>{this.props.track.artist} | {this.props.track.album}</p>
                    </div>
                    </div>
                </div>
                    {this.renderAction()}  
            </div>
        )
    }
}

export default Track