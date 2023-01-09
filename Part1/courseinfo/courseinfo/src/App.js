const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  const Header = (props) => <h1>{props.course}</h1>;

  const Content = (props) => (
    <div>
      <Part partTitle={props.part1} excercises={props.exercises1}/>
      <Part partTitle={props.part2} excercises={props.exercises2}/>
      <Part partTitle={props.part3} excercises={props.exercises3}/>
    </div>
  );

  const Total = (props) => (
    <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
  );

  const Part = (props) => (
    <p>{props.partTitle} {props.excercises}</p>
  )

  return (
    <div>
      <Header course={course}/>
      <Content
        part1={part1}
        exercises1={exercises1}
        part2={part2}
        exercises2={exercises2}
        part3={part3}
        exercises3={exercises3}
      />
      <Total
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
    </div>
  );
};

export default App;
