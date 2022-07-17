interface Input {
    target: number;
    data: Array<number>;
}

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (input: Input): Result => {

    // EXTRACT PARAMS
    const { data, target } = input;

    // COMPUTE AVG WORKOUT
    const training_days = data.filter(duration => duration > 0).length;
    const average = data.reduce((a, b) => a+b, 0) / data.length;
    const success = average >= target;

    // FIND BEST DESCRIPTION
    let description: string;
    const upper = target*1.2;
    const lower = target*0.8;

    if (average >= upper) {
        description = 'You overshot your target greatly.';
    } else if (average > target) {
        description = 'You are slightly above your target';
    } else if (average === target) {
        description = 'You hit your goal perfectly';
    } else if (average > lower) {
        description = 'You are slightly below your target';
    } else {
        description = 'You missed your target greatly';
    }
    
    return {
        periodLength: data.length,
        trainingDays: training_days,
        success: success,
        rating: 2,
        ratingDescription: description,
        target: target,
        average: average,
    };
};

export default calculateExercises;