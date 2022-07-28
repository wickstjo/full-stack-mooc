import React from 'react';
import axios from 'axios';
import { Button } from "@material-ui/core";
import AddPatientModal from "./window";
import { FormValues } from "./form";
import { apiBaseUrl } from "../../constants";
import { useStateValue } from "../../state";
import { Patient } from "../../types/patient";

interface Props {
    patient_id: string;
}

const Prompt = ({ patient_id }: Props) => {

    const [, dispatch] = useStateValue();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>();

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewPatient = async (values: FormValues) => {
        try {
            const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients/${ patient_id }/entries`, values);
            console.log(data);

            dispatch({
                type: "UPDATE_PATIENT",
                payload: data
            });

            closeModal();

        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error(error?.response?.data || "Unrecognized axios error");
                setError(String(error?.response?.data?.error) || "Unrecognized axios error");
            } else {
                console.error("Unknown error", error);
                setError("Unknown error");
            }
        }
    };

    return (
        <div>
            <AddPatientModal
                modalOpen={ modalOpen }
                onSubmit={ submitNewPatient }
                error={ error }
                onClose={ closeModal }
            />
            <Button variant="contained" onClick={ () => openModal() }>Add HealthCheck Entry</Button>
        </div>
    );
};

export default Prompt;