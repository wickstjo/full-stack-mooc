import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField } from "../field";
import { Hospital } from "../../types/entry";

export type FormValues = Omit<Hospital, "id" | "type" | "diagnosisCodes">;

interface Props {
    onSubmit: (values: FormValues) => void;
    onCancel: () => void;
}

const inits = {
    type: 'Hospital',
    description: '',
    date: '',
    specialist: '',
    discharge: {
        date: '',
        criteria: ''
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
            
            if (!values.specialist) { errors.specialist = requiredError; }
            if (!values.discharge.criteria) { errors['discharge.criteria'] = requiredError; }

            if (!values.date) {
                errors.date = requiredError;
            } else if (!is_date(values.date)) {
                errors.date = "Current date is not valid";
            }

            if (!values.discharge.date) {
                errors['discharge.date'] = requiredError;
            } else if (!is_date(values.discharge.date)) {
                errors['discharge.date'] = "Discharge date is not valid";
            }

            return errors;
        }}>
            {({ isValid, dirty }) => {
                return (
                    <Form className="form ui">
                        <Field label="Description" placeholder="Description" name="description" component={ TextField } />
                        <Field label="Current Date" placeholder="CurrentDate" name="date" component={ TextField } />
                        <Field label="Specialist" placeholder="Specialist" name="specialist" component={ TextField } />
                        <Field label="Discharge Date" placeholder="DischargeDate" name="discharge.date" component={ TextField } />
                        <Field label="Discharge Criteria" placeholder="Criteria" name="discharge.criteria" component={ TextField } />
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
