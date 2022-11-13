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
                    valueContainer: (privided) => ({
                        ...privided,
                        paddingLeft: "2.98px",
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
                    indicatorSeparator: () => ({
                        display: "none",
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

export default Step3;
