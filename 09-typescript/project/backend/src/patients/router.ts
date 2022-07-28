import express from 'express';
import data from './data';
import service from './service';

// CREATE ROUTER
const router = express.Router();

router.get('/', (_req, res) => {
    // const data = service.getEntries();
    const data = service.getScrubbed();
    return res.send(data);
});

router.get('/:id', (req, res) => {
    const entry = service.findById(req.params.id);
  
    if (entry) {
        return res.send(entry);
    } else {
        return res.sendStatus(404);
    }
});

router.post('/', (req, res) => {
    try {
        /* eslint-disable @typescript-eslint/no-unsafe-assignment */
        const { name, dateOfBirth, ssn, gender, occupation } = req.body;
        const entry = service.addPatient({ name, dateOfBirth, ssn, gender, occupation });
        return res.json(entry);
        
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.json({
                error: error.message
            });
        }
        
        return res.json({
            error: 'Something went wrong, try again.'
        });
    }
});

router.post('/:id/entries', (req, res) => {
    console.log('called');

    // CHECK IF THE PATIENT EXISTS
    const target = data.findIndex(entry => entry.id === req.params.id);
    let entry;

    // CANCEL IF THE PATIENT DOESNT EXIST
    if (target === -1) {
        return res.json({
            error: `A patient with this ID does not exist.`
        });
    }

    // DESTRUCTURE ALL THE PARAMS
    const { type, description, date, specialist, employerName, sickLeave, discharge, healthCheckRating } = req.body;

    try {
        switch (type) {

            case 'OccupationalHealthcare': {
                entry = service.add_healthcare({
                    type, description, date, specialist, employerName, sickLeave
                }, target);
            } break;

            case 'Hospital': {
                entry = service.add_hospital({
                    type, description, date, specialist, discharge
                }, target);
            } break;

            case 'HealthCheck': {
                entry = service.add_healthcheck({
                    type, description, date, specialist, healthCheckRating
                }, target);
            } break;

            // FALLBACK
            default: {
                return res.json({
                    error: `Unknown entry type: ${ type }`
                });
            }
        }

        // RETURN WITH SUCCESS
        return res.status(200).json(entry);

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error.message);
            return res.json({
                error: error.message
            });
        }
        
        return res.json({
            error: 'Something went wrong, try again.'
        });
    }
});

export default router;