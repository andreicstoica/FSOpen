import express from 'express';
import calculateBMI from './bmiCalculator';
//import { calculator, Operation } from './calculator';
import { calculateExercises } from './exerciseCalculator';
import { isNotNumber } from './utils';

const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack! Let\'s go!');
});

app.get('/bmi', (req, res) => {
  if (!req.query.height || !req.query.weight) {
    res.status(400).send({ error: 'malformatted parameters' });
    return;
  }
  if (isNotNumber(req.query.height) || isNotNumber(req.query.weight)) {
    res.status(400).send({ error: 'malformatted parameters' });
    return;
  }
  if (Number(req.query.height) <= 0 || Number(req.query.weight) <= 0) {
    res.status(400).send({ error: 'malformatted parameters' });
    return;
  } else {
    res.send({
      weight: Number(req.query.weight),
      height: Number(req.query.height),
      bmi: calculateBMI({
        height: Number(req.query.height),
        weight: Number(req.query.weight)
      })
    });
  }
});

app.post('/exercises', (req, res) => {
  const body = req.body as { daily_exercises: number[], target: number };
  const { daily_exercises, target } = body;
  //console.log(daily_exercises, target);

  if (target < 0 || isNotNumber(target)) {
    res.status(400).send({ error: 'malformatted parameters' });
    return;
  };

  if (isNaN(target) || daily_exercises.length === 0) {
    res.status(400).send({ error: 'missing parameters' });
  } else {
    res.send(
      calculateExercises(daily_exercises, target)
    );
  };
});

/*
app.post('/calculate', (req, res) => {
  
  const body = req.body as { value1?: unknown, value2?: unknown, op?: unknown }; // Assert basic shape or use a validation library
  const { value1, value2, op } = body;

  // validation
  if (value1 === undefined || value2 === undefined || op === undefined) {
    // Use 400 for bad client request
    res.status(400).send({ error: 'Missing required parameters: value1, value2, op' });
    return;
  }

  // More robust type checking (req.body values might be strings)
  const num1 = Number(value1);
  const num2 = Number(value2);

  if (isNaN(num1) || isNaN(num2)) {
    res.status(400).send({ error: 'Parameters value1 and value2 must be valid numbers' });
    return;
  }

  // Validate 'op' against your defined Operation type
  // Example validation:
  const validOps: Operation[] = ['add', 'multiply', 'divide']; // Replace with your actual Operation values
  if (typeof op !== 'string' || !validOps.includes(op as Operation)) {
    res.status(400).send({ error: `Invalid operation. Must be one of: ${validOps.join(', ')}` });
    return;
  }

  // Now that types are validated, you can use them
  // Type assertion for 'op' is safer now after validation
  const result = calculator(num1, num2, op as Operation);

  // Send the result - implicit status 200 OK
  return res.send({ result });
});
*/

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});