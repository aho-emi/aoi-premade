
module.exports = async (d) => {
    const data = d.util.aoiFunc(d);
    const [age, weight, height] = data.inside.splits;


function calculateBMI(weight, height, age) {
  if (isNaN(weight) || isNaN(height) || isNaN(age) || height <= 0 || weight <= 0 || age <= 0) {
    return 'Invalid input. Please enter valid weight, height, and age.';
  }
  const bmi = weight / Math.pow(height, 2);

  if (age < 18.5) {
    if (bmi < 18.5) {
      return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return 'Normal weight';
    } else if (bmi >= 25 && bmi < 29.9) {
      return 'Overweight';
    } else {
      return 'Obese';
    }
  } else if (age >= 18.5 && age < 24.9) {
    if (bmi < 17.5) {
      return 'Underweight';
    } else if (bmi >= 17.5 && bmi < 23) {
      return 'Normal weight';
    } else if (bmi >= 23 && bmi < 27.5) {
      return 'Overweight';
    } else {
      return 'Obese';
    }
  } else {
    if (bmi < 16.5) {
      return 'Underweight';
    } else if (bmi >= 16.5 && bmi < 22.9) {
      return 'Normal weight';
    } else if (bmi >= 23 && bmi < 28.5) {
      return 'Overweight';
    } else {
      return 'Obese';
    }
  }
}


  data.result = calculateBMI(weight, height, age);

  
    return {
        code: d.util.setCode(data),
    };
};
