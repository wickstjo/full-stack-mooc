import { State } from "./state";
import { Patient } from "../types/patient";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
    | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
    | {
      type: "UPDATE_PATIENT";
      payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
      case "UPDATE_PATIENT":
        return {
          ...state,
          patients: {
            ...state.patients,
            [action.payload.id]: action.payload
          }
        };
    default:
      return state;
  }
};

const set_patients = (payload: Patient[]): Action => {
    return {
        type: "SET_PATIENT_LIST",
        payload
    };
};

export {
    set_patients
};