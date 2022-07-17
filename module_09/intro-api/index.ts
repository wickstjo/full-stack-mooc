import express from 'express';
import bmi_calc from './bmiCalculator';
import exercises_calc from './exerciseCalculator';
console.clear();

// AUXILLARY
const app = express();
app.use(express.json());
const PORT = 3003;

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

    // EXTRACT PARAMS
    const { height, weight } = req.query;

    // MISSING PARAMS
    if (!height || !weight) {
        res.send({
            error: 'Height and weight parameters are required.'
        });
    }

    // WRONG FORMAT
    // MISSING PARAMS
    if (isNaN(Number(height)) || isNaN(Number(weight))) {
        res.send({
            error: 'Height and weight parameter must be numeric.'
        });
    }

    // PARSE BOTH PARAMS
    const parsed_height = Number(height);
    const parsed_weight = Number(weight);

    // COMPUTE BMI
    const bmi = bmi_calc({
        height: parsed_height,
        weight: parsed_weight
    });

    // RESPOND
    res.send({
        height: parsed_height,
        weight: parsed_weight,
        bmi: bmi
    });
});

app.post('/exercise', (req, res) => {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
  
    // PROPS MISSING
    if (!daily_exercises || !target) {
        return res.send({
            error: 'Two properties are required: daily_exercises, target'
        });
    }
    
    // PARSED DATASET
    const parsed_values: Array<number> = [];

    // VERIFY THAT DATASET IS NUMERIC
    for (const item in daily_exercises) {

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const temp = Number(daily_exercises[item]);

        if (isNaN(temp) || isNaN(Number(target))) {
            return res.send({
                error: 'Property values should exclusively be numeric types.'
            });
        }

        // PUSH TO NEW CONTAINER
        parsed_values.push(temp);
    }

    // NOW WE CAN GUARANTEE THAT THE TARGET IS NUMERIC
    const parsed_target = Number(target);
    
    // COMPUTE RESULT
    const result = exercises_calc({
        target: parsed_target,
        data: parsed_values,
    });

    // RESPOND
    return res.send(result);
});

// START SERVER
app.listen(PORT, () => {
    console.log(`Server running on port ${ PORT }`);
});