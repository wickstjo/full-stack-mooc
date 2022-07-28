import React from "react";
import axios from "axios";

import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container } from "@material-ui/core";
import { apiBaseUrl } from "./constants";
import { useStateValue, set_patients } from "./state";
import { Patient } from "./types/patient";

import PatientsPage from "./pages/patients_page";
import PatientPage from "./pages/patient_page";
import { Typography } from "@material-ui/core";

const App = () => {
    const [, dispatch] = useStateValue();
    React.useEffect(() => {
        void axios.get<void>(`${ apiBaseUrl }/ping`);


        const fetchPatientList = async () => {
            const { data: patientListFromApi } = await axios.get<Patient[]>(`${ apiBaseUrl }/patients`);
            dispatch(set_patients(patientListFromApi));
        };

        void fetchPatientList();
    }, [dispatch]);

    return (
        <div className="App">
        <Router>
            <Container>
            <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
                Patientor
            </Typography>
            <Button component={Link} to="/" variant="contained" color="primary">
                Patients
            </Button>
            <Divider hidden />
            <Routes>
                <Route path="/" element={ <PatientsPage /> } />
                <Route path="/patients/:id" element={ <PatientPage /> } />
            </Routes>
            </Container>
        </Router>
        </div>
    );
};

    export default App;
