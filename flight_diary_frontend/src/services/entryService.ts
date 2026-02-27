import axios from 'axios';
import type { DiaryEntry } from '../types';

const baseUrl = '/api/diaries';

const getAllEntries = async () => {
    const { data } = await axios.get<DiaryEntry[]>(baseUrl);

    return data;
}

export default {
    getAllEntries
};