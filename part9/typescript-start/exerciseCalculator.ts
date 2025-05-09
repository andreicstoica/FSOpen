/*
Write a function calculateExercises that calculates the average time of daily exercise hours, compares it to the target amount of daily hours and returns an object that includes the following values:
the number of days
the number of training days
the original target value
the calculated average time
boolean value describing if the target was reached
a rating between the numbers 1-3 that tells how well the hours are met. You can decide on the metric on your own.
a text value explaining the rating, you can come up with the explanations
*/

/*
import { isNotNumber } from "./utils";

interface ExerciseInputValues {
  target: number;
  dailyHours: number[];
}
  */

type Rating = 'bad' | 'decent' | 'good';

interface ExerciseValues {
  days: number;
  trainingDays: number;
  originalTarget: number;
  avgTime: number;
  targetReached: boolean;
  rating: Rating;
  explanation: string;
}

/*
const parseArguments = (args: string[]): ExerciseInputValues => {
  if (!isNotNumber(args[0])) {
    return {
      target: Number(args[0]),
      dailyHours: args.slice(1).map((value) => Number(value))
    };
  } else {
    throw new Error(`Target value was not a number! It was ${args[0]}`);
  }
};
*/

export const calculateExercises = (dailyHours: number[], target: number): ExerciseValues => {
  const avgTime: number = dailyHours.reduce((accumulator, value) => accumulator + value, 0) / dailyHours.length;

  let rating: Rating;
  let explanation: string;

  if (avgTime >= target) {
    rating = "good";
    explanation = "Great job, target met!";
  } else if (avgTime >= target - 0.5) {
    rating = "decent";
    explanation = 'Not too bad but could be better';
  } else {
    rating = "bad";
    explanation = 'You need to exercise more';
  }

  return({
    days: dailyHours.length,
    trainingDays: dailyHours.filter(day => day != 0).length,
    originalTarget: target,
    avgTime: avgTime,
    targetReached: avgTime >= target ? true : false,
    rating: rating,
    explanation: explanation
  });
};

//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
/*
const args = process.argv.slice(2);
console.log(calculateExercises(parseArguments(args).dailyHours, parseArguments(args).target));
*/