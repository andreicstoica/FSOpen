import { useState } from 'react'

const scoreAvg = (good, neutral, bad) => {
  const total = good + neutral + bad
  if (total === 0) {
    return 0
  } else {
    const average = (good - bad) / total
    return average
  }
}

const scorePositive = (good, neutral, bad) => {
  const total = good + neutral + bad
  if (total === 0) {
    return 0
  } else {
    const positive = (good / total) * 100
    return positive.toString() + ' %'
  }
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({ count, text }) => {
  if (count === 0) {
    return (
      <>
        <td>{text}</td>
        <td>0</td>
      </>
    )
  } else {
    return (
      <>
        <td>{text}</td> 
        <td>{count}</td>
      </>
    )
  }
}

const Statistics = ({good, neutral, bad}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>statistics</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <StatisticLine text='good' count={good} />
        </tr>
        <tr>
          <StatisticLine text='neutral' count={neutral} />
        </tr>
        <tr>
          <StatisticLine text='bad' count={bad} />
        </tr>
        <tr>
          <StatisticLine text='average' count={scoreAvg(good, neutral, bad)} />
        </tr>
        <tr>
          <StatisticLine text='positive' count={scorePositive(good, neutral, bad)} /> 
        </tr>
      </tbody>
    </table>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  
  const handleAnecChange = () => {
    const newNum = Math.floor(Math.random() * anecdotes.length)
    setSelected(newNum)
    console.log('hello', newNum);
  }

  const handleVoteClick = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const handleGoodClick = () => {
    //console.log('good', good + 1);
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    //console.log('neutral', neutral + 1);
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    //console.log('bad', bad + 1);
    setBad(bad + 1)
  }

  const findMax = (arr) => {
    const maxValue = Math.max(...arr);
    return arr.indexOf(maxValue);
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes </p>
      <Button
        handleClick={handleVoteClick}
        text='vote'
      />
      <Button 
        handleClick={handleAnecChange} 
        text='next anecdote'
      />
      <h1>Anecdote with the most votes</h1>
      {anecdotes[findMax(votes)]}
      <p>has {votes[findMax(votes)]} votes</p>
      <br />
      <br />
      <br />
      <Button 
        handleClick={handleGoodClick}
        text='good'
      />
      <Button 
        handleClick={handleNeutralClick}
        text='neutral'
      />
      <Button 
        handleClick={handleBadClick}
        text='bad'
      />


      <br />
      <br />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App