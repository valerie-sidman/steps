import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import TrackList from './TrackList.js';

function parseDate(str) {
  const m = str.match(/^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\d{2})$/);
  return (m) ? new Date(m[3], m[2] - 1, m[1]) : null;
}

export default function FitnessTracker() {
  const [form, setForm] = useState(
    {
      date: '',
      distance: '',
      tracks: []
    }
  );

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!parseFloat(form.distance)) {
      alert('Некорректная дистанция. Необходимо указать в км');
      return;
    }
    if (!parseDate(form.date)) {
      alert('Некорректная дата. Необходимо указать в формате ДД.ММ.ГГ');
      return;
    }
    const existingDateIndex = form.tracks.findIndex((track) => track.date === form.date);
    if (existingDateIndex === -1) {
      form.tracks.push({ date: form.date, distance: form.distance, id: nanoid() });
      form.tracks = form.tracks.sort((track1, track2) => {
        const dateA = parseDate(track1.date);
        const dateB = parseDate(track2.date);
        return dateB - dateA;
      });
    } else {
      form.tracks[existingDateIndex] = { id: form.tracks[existingDateIndex].id, date: form.date, distance: parseFloat(form.distance) + parseFloat(form.tracks[existingDateIndex].distance) };
    }

    setForm(prevForm => ({ ...prevForm, date: '', distance: '' }));
  }

  const handleChange = ({ target }) => {
    const name = target.name;
    const value = target.value;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  }

  const handleRemove = ({ target }) => {
    const deleteIndex = form.tracks.findIndex((track) => track.id === target.parentNode.getAttribute('id'));
    form.tracks.splice(deleteIndex, 1);
    setForm(prevForm => ({ ...prevForm }));
  }

  return (
    <div className="container">
      <div className="tracker-block">
        <form className="tracker-form" onSubmit={handleSubmit}>
          <div className="date-box">
            <label className="field-title" htmlFor="date">Дата (ДД.ММ.ГГ)</label>
            <input className="field" id="date" name="date" value={form.date} onChange={handleChange} />
          </div>
          <div className="distance-box">
            <label className="field-title" htmlFor="distance">Пройдено км</label>
            <input className="field" id="distance" name="distance" value={form.distance} onChange={handleChange} />
          </div>
          <button className="submit-btn" type="submit">Ok</button>
        </form>
        <div className="table-block">
          <div className="table-titles">
            <span className="column-title title-date">Дата (ДД.ММ.ГГ)</span>
            <span className="column-title title-distance">Пройдено км</span>
            <span className="column-title title-actions">Действия</span>
          </div>
          <TrackList tracks={form.tracks} onRemove={handleRemove}/>
        </div>
      </div>
    </div>
  )
}
