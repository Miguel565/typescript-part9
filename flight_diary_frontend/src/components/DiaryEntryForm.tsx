import { useState } from 'react';

import diaryService from '../services/entryService';
import { type NewDiaryEntry, Weather, Visibility } from '../types';
import Notify from './Notify';

interface WeatherOption {
    value: Weather;
    label: string;
}

const weatherOptions: WeatherOption[] = Object.values(Weather).map(w => ({
    value: w,
    label: w.toString()
}));

interface VisibilityOption {
    value: Visibility;
    label: string;
}

const visibilityOptions: VisibilityOption[] = Object.values(Visibility).map(v => ({
    value: v,
    label: v.toString()
}))

const DiaryEntryForm = () => {

    const [date, setDate] = useState('');
    const [visibility, setVisibility] = useState<Visibility>(Visibility.Good);
    const [weather, setWeather] = useState<Weather>(Weather.Sunny);
    const [comment, setComment] = useState('');

    const [notify, setNotify] = useState('');

    const addEntry = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newEntry: NewDiaryEntry = {
            date: date,
            visibility: visibility,
            weather: weather,
            comment: comment
        }
        diaryService.createEntry(newEntry).then(() => {
            setNotify('');
            setDate('');
            setVisibility(Visibility.Good);
            setWeather(Weather.Sunny);
            setComment('');
        }).catch(error => {
            setNotify(error.response.data.error);
        });
    };

    return (
        <div>
            <h2>Add new entry</h2>
            <Notify messager={notify} />
            <form onSubmit={addEntry}>
                <div>
                    <label>
                        Date:
                        <input
                            type="date"
                            name="date"
                            onChange={({ target }) => setDate(target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <fieldset>
                        <legend>Visibility</legend>
                        {visibilityOptions.map(v => (
                            <label key={v.value}>
                                <input
                                    type="radio"
                                    name="visibility"
                                    value={v.value}
                                    checked={visibility === v.value}
                                    onChange={() => setVisibility(v.value)}
                                />
                                {v.label}
                            </label>
                        ))}
                    </fieldset>
                </div>
                <div>
                    <fieldset>
                        <legend>Weather</legend>
                        {weatherOptions.map(w => (
                            <label key={w.value}>
                                <input
                                    type="radio"
                                    name="weather"
                                    value={w.value}
                                    checked={weather === w.value}
                                    onChange={() => setWeather(w.value)}
                                />
                                {w.label}
                            </label>
                        ))}
                    </fieldset>
                </div>
                <div>
                    <label>
                        Comment:
                        <textarea
                            name="comment"
                            onChange={({ target }) => setComment(target.value)}
                        />
                    </label>
                </div>
                <div>
                    <button type="submit">Add Entry</button>
                </div>
            </form>
        </div>
    );
}

export default DiaryEntryForm;