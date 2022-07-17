interface Input {
    height: number;
    weight: number;
}

const calculateBmi = (input: Input): string => {

    // EXTRACT PARAMS & COMPUTE BMI
    const { height, weight } = input;
    const adjusted_height = height / 100.0;
    const BMI = weight / (adjusted_height*adjusted_height);
    
    // DECIDE TAG
    if (BMI < 18.5) { return 'Underweight (Unhealthy)'; }
    else if (BMI < 22.9) { return 'Normal range (Healthy)'; }
    else if (BMI < 24.9) { return 'Overweight I (At risk)'; }
    else if (BMI < 29.9) { return 'Overweight II (Moderately obese)'; }
    else { return 'Overweight III (Severely obese)'; }
}

export default calculateBmi;