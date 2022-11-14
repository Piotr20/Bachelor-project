import Select from "react-select";
import { useEffect, useState } from "react";
import { StepProps } from "~/models/signUpSteps";
import { getAllFromEndpointHelper, handleUserPropsHelper } from "~/lib/helpers/signUp.helper";
import { StyledSelect } from "./step1";
import { colors } from "~/util/colorPalette";

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
                    valueContainer: (provided) => ({
                        ...provided,
                        paddingLeft: "2.98px",
                        paddingTop: "0",
                        outline: "none !important",
                    }),
                    input: (provided) => ({
                        ...provided,
                        padding: "0",
                        margin: "0",
                    }),
                    control: (provided) => ({
                        ...provided,
                        borderWidth: "0 !important",
                        borderColor: "none !important",
                    }),
                    indicatorsContainer: (privided) => ({
                        ...privided,
                        paddingRight: "0",
                    }),
                    multiValue: (privided) => ({
                        ...privided,
                        backgroundColor: colors.secondary.lightYellow + "40",
                    }),
                }}
            />
        </StyledSelect>
    );
};

export default Step2;
