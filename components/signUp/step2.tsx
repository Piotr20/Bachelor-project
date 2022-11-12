import Select from "react-select";
import { useEffect, useState } from "react";
import { StepProps } from "~/models/signUpSteps";
import { getAllFromEndpointHelper, handleUserPropsHelper } from "~/lib/helpers/signUp.helper";
import { StyledSelect } from "./step1";

const Step2 = ({ user, setUser }: StepProps) => {
    const [selectedProjects, setSelectedProjects] = useState<any>(null);
    const [projectOptions, setProjectOptions] = useState<any[]>([]);

    useEffect(() => {
        getAllFromEndpointHelper(setProjectOptions, "projects");
    }, []);

    return (
        <StyledSelect>
            <Select
                isSearchable={true}
                isMulti={true}
                defaultValue={selectedProjects}
                value={selectedProjects}
                placeholder="Search for projects (e.g. LEGO, Montana)"
                onChange={(newValue: any) => {
                    handleUserPropsHelper(newValue, setUser, user, setSelectedProjects, "projects");
                }}
                options={projectOptions}
                styles={{
                    valueContainer: (privided) => ({
                        ...privided,
                        paddingLeft: "0",
                        paddingTop: "0",
                        outline: "none !important",
                    }),
                    input: (privided) => ({
                        ...privided,
                        padding: "0",
                        margin: "0",
                    }),
                    control: (privided) => ({
                        ...privided,
                        borderWidth: "0 !important",
                        borderColor: "none !important",
                    }),
                }}
            />
        </StyledSelect>
    );
};

export default Step2;
