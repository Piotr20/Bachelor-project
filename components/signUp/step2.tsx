import Select from "react-select";
import { useEffect, useState } from "react";
import { StepProps } from "~/models/signUpSteps";
import {
    getAllFromEndpointHelper,
    handleUserPropsHelper,
} from "~/lib/helpers/signUp.helper";

const Step2 = ({ user, setUser }: StepProps) => {
    const [selectedProjects, setSelectedProjects] = useState<any>(null);
    const [projectOptions, setProjectOptions] = useState<any[]>([]);

    useEffect(() => {
        getAllFromEndpointHelper(setProjectOptions, "projects");
    }, []);

    return (
        <>
            <label htmlFor="project">Project:</label>

            <Select
                isSearchable={true}
                isMulti={true}
                defaultValue={selectedProjects}
                value={selectedProjects}
                onChange={(newValue: any) => {
                    handleUserPropsHelper(
                        newValue,
                        setUser,
                        user,
                        setSelectedProjects,
                        "projects"
                    );
                }}
                options={projectOptions}
            />
        </>
    );
};

export default Step2;
