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
                            type="text"
                            name="date"
                            onChange={({ target }) => setDate(target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Visibility:
                        <select
                            name="visibility"
                            onChange={({ target }) => setVisibility(target.value as Visibility)}
                        >
                            <option value="">Select visibility</option>
                            {visibilityOptions.map(v => (
                                <option key={v.value} value={v.value}>{v.label}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Weather:
                        <select
                            name="weather"
                            onChange={({ target }) => setWeather(target.value as Weather)}
                        >
                            <option value="">Select weather</option>
                            {weatherOptions.map(w => (
                                <option key={w.value} value={w.value}>{w.label}</option>
                            ))}
                        </select>
                    </label>
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