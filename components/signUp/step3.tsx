import { useEffect, useState } from "react";
import { getAllFromEndpointHelper, handleUserPropsHelper } from "~/lib/helpers/signUp.helper";
import { StepProps } from "~/models/signUpSteps";
import Select from "react-select";
import { StyledSelect } from "./step1";
import { colors } from "~/util/colorPalette";

const Step3 = ({ user, setUser }: StepProps) => {
    const [selectedSkills, setSelectedSkills] = useState<any>(null);
    const [skillOptions, setSkillOptions] = useState<any[]>([]);
    useEffect(() => {
        getAllFromEndpointHelper(setSkillOptions, "skills");
    }, []);
    return (
        <StyledSelect>
            <Select
                isSearchable={true}
                isMulti={true}
                placeholder="Search for skills (e.g. Next.js, Figma)"
                defaultValue={selectedSkills}
                value={selectedSkills}
                onChange={(newValue: any) => {
                    handleUserPropsHelper(newValue, setUser, user, setSelectedSkills, "skills");
                }}
                options={skillOptions}
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
                    indicatorSeparator: () => ({
                        display: "none",
                    }),
                    indicatorsContainer: (provided) => ({
                        ...provided,
                        paddingRight: "0",
                    }),
                    multiValue: (provided) => ({
                        ...provided,
                        backgroundColor: colors.secondary.lightYellow + "60",
                    }),
                }}
            />
        </StyledSelect>
    );
};

export default Step3;
