import axios from 'axios';
import type { DiaryEntry, NewDiaryEntry } from '../types';

const baseUrl = '/api/diaries';

const getAllEntries = async () => {
    const { data } = await axios.get<DiaryEntry[]>(baseUrl);

    return data;
}

const createEntry = async (entry: NewDiaryEntry) => {
    const { data } = await axios.post(baseUrl, entry);
    return data;
}

export default {
    getAllEntries,
    createEntry
};