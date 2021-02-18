import React from 'react';
import Track from './Track.js';

export default function TrackList({ tracks, onRemove }) {
  return (
    <ul className="track-list">
      {
        tracks.map((track) => <Track key={track.id} id={track.id} date={track.date} distance={track.distance} onRemove={onRemove}/>)
      }
    </ul>
  )
}
