import { isNotNumber } from "./utils"

interface BMIValues {
  height: number,
  weight: number
}

const parseArguments = (args: string[]): BMIValues => {
  if (args.length < 2) throw new Error(`Not enough arguments. Input length: ${args.length}`);
  if (args.length > 2) throw new Error('Too many arguments');

  if (!isNotNumber(args[0]) && !isNotNumber(args[1])) {
    return {
      height: Number(args[0]),
      weight: Number(args[1])
    }
  } else {
    throw new Error(`Provided values were not numbers! First was ${args[0]}`);
  }
}

const calculateBMI = (values: BMIValues): string => {
  const height: number = values.height;
  const weight: number = values.weight;

  let bmi: number = weight / Math.pow((height / 100), 2);

  if (bmi < 16) {
    return 'Underweight (Severe thinness)';
  } else if (bmi < 17) {
    return 'Underweight (Moderate thinness)';
  } else if (bmi < 18.5) {
    return 'Underweight (Mild thinness)';
  } else if (bmi < 25) {
    return 'Normal range';
  } else if (bmi < 30) {
    return 'Overweight (Pre-obesity)';
  } else if (bmi < 35) {
    return 'Obese Class I (Moderate obesity)';
  } else if (bmi < 40) {
    return 'Obese Class II (Severe obesity)';
  } else {
    return 'Obese Class III (Very severe or morbid obesity)';
  }
}

export default calculateBMI;

//console.log(calculateBmi(180, 74));

if (require.main === module) {
  console.log(calculateBMI(parseArguments(process.argv.slice(2))));
}