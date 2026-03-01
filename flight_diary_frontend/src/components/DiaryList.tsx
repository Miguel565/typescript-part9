import type { DiaryEntry } from '../types';

interface Props {
    diaries: DiaryEntry[]
    //setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>
}

const DiaryList = ({ diaries } : Props ) => {
    return (
        <div>
            <h2>Diary entries</h2>
            {diaries.map(diary => (
                <div key={diary.id}>
                    <p><strong>Date:{diary.date}</strong></p>
                    <p>Clima:{diary.weather}</p>
                    <p>Visibilidad:{diary.visibility}</p>
                    <p>Comentario: {diary.comment}</p>
                </div>
            ))}
        </div>
    );
}

export default DiaryList;