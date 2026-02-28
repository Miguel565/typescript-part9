import { useState, useEffect } from 'react'
import './App.css'

import type { DiaryEntry } from './types';
import diaryService from './services/entryService';

import DiaryList from './components/DiaryList';
import DiaryEntryForm from './components/DiaryEntryForm';

const App = () => {
  const [diary, setDiary] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiaryList = async () => {
      const diaries = await diaryService.getAllEntries();
      setDiary(diaries);
    };

    fetchDiaryList();
  }, [])

  return (
    <>
      <h1>Flight Diaries Entry</h1>
      <DiaryEntryForm />
      <DiaryList diaries={diary} />
    </>
  )
}

export default App
