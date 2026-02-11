//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'

const Header = ({course}) => <h1>{course}</h1>;

const Part = ({name, exercises}) => <p>
  {name} {exercises}
</p>;

const Content = ({parts}) => {
  return (
    <div>
      {parts.map((part, index) => <Part key={index.toString()} name={part.name} exercises={part.exerciseCount} />)}
    </div>
  );
};

const Total = ({counts}) => {
  const sumExercises = counts.reduce((sum, count) => sum + count.exerciseCount, 0);

  return (
    <div>
      <p>
        Number of exercises: {sumExercises}
      </p>
    </div>
  );
};

const App = () => {
  const courseName = "Half Stack application development";

  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header course={courseName} />
      <Content parts={courseParts} />
      <Total counts={courseParts} />
    </div>
  );
};

export default App;