import React from 'react';

export default function Track({id, date, distance, onRemove, remove = '✘'}) {
  return (
    <li className="track" id={id}>
      <div className="track-date">{date}</div>
      <div className="track-distance">{distance}</div>
      <button className="track-remove" onClick={onRemove}>{remove}</button>
    </li>
  )
}
