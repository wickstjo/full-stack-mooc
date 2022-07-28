import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField } from "../field";
import { OccupationalHealthcare } from "../../types/entry";

export type FormValues = Omit<OccupationalHealthcare, "id" | "type" | "diagnosisCodes">;

interface Props {
    onSubmit: (values: FormValues) => void;
    onCancel: () => void;
}

const inits = {
    type: 'OccupationalHealthcare',
    description: '',
    date: '',
    specialist: '',
    employerName: '',
    sickLeave: {
        startDate: '',
        endDate: ''
    }
};

const is_date = (param: string): boolean => {
    return Boolean(Date.parse(param));
};

export const AddPatientForm = ({ onSubmit, onCancel }: Props) => {
    return (
        <Formik initialValues={ inits } onSubmit={ onSubmit } validate={(values) => {
            const requiredError = "Field is required";
            const errors: { [field: string]: string } = {};

            if (!values.description) { errors.description = requiredError; }
            if (!values.date) { errors.date = requiredError; }
            if (!values.specialist) { errors.specialist = requiredError; }
            if (!values.employerName) { errors.employerName = requiredError; }
            if (!values.sickLeave.startDate) { errors['sickLeave.startDate'] = requiredError; }
            if (!values.sickLeave.endDate) { errors['sickLeave.endDate'] = requiredError; }

            if (!is_date(values.date)) {
                errors.date = 'Current date is not a valid date';
            }

            if (!is_date(values.sickLeave.startDate)) {
                errors['sickLeave.startDate'] = 'Sickleave start date is not a valid date';
            }

            if (!is_date(values.sickLeave.endDate)) {
                errors['sickLeave.endDate'] = 'Sickleave start date is not a valid date';
            }

            return errors;
        }}>
            {({ isValid, dirty }) => {
                return (
                    <Form className="form ui">
                        <Field label="Description" placeholder="Description" name="description" component={ TextField } />
                        <Field label="Current Date" placeholder="CurrentDate" name="date" component={ TextField } />
                        <Field label="Specialist" placeholder="Specialist" name="specialist" component={ TextField } />
                        <Field label="Employer" placeholder="Employer" name="employerName" component={ TextField } />
                        <Field label="Sickleave Start Date" placeholder="Sickleave Start Date" name="sickLeave.startDate" component={ TextField } />
                        <Field label="Sickleave End Date" placeholder="Sickleave End Date" name="sickLeave.endDate" component={ TextField } />
                        <Grid>
                            <Grid item>
                                <Button color="secondary" variant="contained" style={{ float: "left" }} type="button" onClick={ onCancel }>Cancel</Button>
                            </Grid>
                            <Grid item>
                                <Button style={{ float: "right", }} type="submit" variant="contained" disabled={!dirty || !isValid}>Add</Button>
                            </Grid>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddPatientForm;
