import axios from "axios";
import { useState } from 'react'; 
import { useEffect } from "react";
import { Diagnosis } from "../types/diagnosis";
import { apiBaseUrl } from "../constants";

interface Props {
    code: string;
}

const DiagnosisBlock = ({ code }: Props) => {

    const [local, set_local] = useState({
        code: 'foo',
        name: 'foo',
    });

    useEffect(() => {
        if (code) {
            const query = async () => {
                const { data } = await axios.get<Diagnosis>(`${ apiBaseUrl }/diagnosis/${ code }`);
                set_local(data);
            };
    
            void query();
        }
    }, []);

    return (
        <li>{ local.name } ({ local.code })</li>
    );
};

export default DiagnosisBlock;