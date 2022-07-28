import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AddPatientForm, { FormValues } from "./form";

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: FormValues) => void;
    error?: string;
}

const Window = ({ modalOpen, onClose, onSubmit, error }: Props) => (
    <Dialog fullWidth={ true } open={ modalOpen } onClose={ () => onClose() }>
        <DialogTitle>Add HealthCheck Entry</DialogTitle>
        <Divider />
        <DialogContent>
            { error && <Alert severity="error">{`Error: ${ error }`}</Alert> }
            <AddPatientForm onSubmit={onSubmit} onCancel={onClose} />
        </DialogContent>
    </Dialog>
);

export default Window;
