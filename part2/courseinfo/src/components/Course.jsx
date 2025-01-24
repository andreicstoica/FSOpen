/* eslint-disable react/prop-types */
const Header = ({ course }) => <h1>{course}</h1>
const Total = ({ sum }) => <strong>Number of exercises {sum}</strong>

const Parts = ({ parts }) => 
    parts.map(part =>
      <li key={part.id}>
        {part.name} {part.exercises}
      </li>
    )

const Content = ({ parts }) => 
    <ul>
      <Parts parts={parts} />
    </ul>   

const Course = ({ course }) => {
    const { name, parts } = course
    const total = parts.reduce((acc, part) => acc + part.exercises, 0)
    return (
        <>
        <Header course={name} />
        <Content parts={parts} />
        <Total sum={total} />
        </>
    )
}

export default Course 