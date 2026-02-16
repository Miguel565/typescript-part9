import { type JSX } from 'react';
import './App.css';

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  description?: string;
}

interface CoursePartBasic extends CoursePartBase {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBase {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartBase {
  requirements: Array<string>;
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const Header = ({ course }: { course: string }): JSX.Element => <h1>{course}</h1>;

const Part = (props: CoursePart): JSX.Element => {
  return (
    <>
      <h2>
        {props.name} {props.exerciseCount}
      </h2>;
      {props.description && props.kind !== "group" && <p>{props.description}</p>}
      {props.kind === "group" && <p>Project exercises {props.groupProjectCount}</p>}
      {props.kind === "background" && <p>Background material: {props.backgroundMaterial}</p>}
      {props.kind === "special" && <p>Required skills: {props.requirements.join(", ")}</p>}
    </>
  );
}

const Content = ({ parts }: { parts: CoursePart[] }): JSX.Element => {
  return (
    <div>
      {
        parts.map(part => {
          switch (part.kind) {
            case "basic":
              return (
                <Part
                  key={part.name}
                  name={part.name}
                  exerciseCount={part.exerciseCount}
                  description={part.description}
                  kind={part.kind}
                />
              );
            case "group":
              return (
                <Part
                  key={part.name}
                  name={part.name}
                  exerciseCount={part.exerciseCount}
                  groupProjectCount={part.groupProjectCount}
                  kind={part.kind}
                />
              );
            case "background":
              return (
                <Part
                  key={part.name}
                  name={part.name}
                  description={part.description}
                  exerciseCount={part.exerciseCount}
                  backgroundMaterial={part.backgroundMaterial}
                  kind={part.kind}
                />
              );
            case "special":
              return (
                <Part
                  key={part.name}
                  name={part.name}
                  exerciseCount={part.exerciseCount}
                  description={part.description}
                  requirements={part.requirements}
                  kind={part.kind}
                />
              );
            default:
              return assertNever(part);
          }
        })
      }
    </div>
  );
};

const Total = ({ counts }: { counts: CoursePart[] }): JSX.Element => {
  const sumExercises = counts.reduce((sum, count) => sum + count.exerciseCount, 0);

  return (
    <div>
      <p>
        Number of exercises: {sumExercises}
      </p>
    </div>
  );
};

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const App = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
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