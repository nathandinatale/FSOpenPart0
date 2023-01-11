import { useState } from "react";

const Button = ({ name, count, setCount }) => (
  <button onClick={() => setCount(count + 1)}>{name}</button>
);

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good + bad * -1) / all;
  const positive = (good / all) * 100;

  return all > 0 ? (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={`${positive} %`} />
      </tbody>
    </table>
  ) : (
    <p>No feedback given</p>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <div>
        <h3>give feedback</h3>
        <Button name="good" count={good} setCount={setGood} />
        <Button name="neutral" count={neutral} setCount={setNeutral} />
        <Button name="bad" count={bad} setCount={setBad} />
      </div>
      <div>
        <h3>statistics</h3>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  );
};

export default App;
