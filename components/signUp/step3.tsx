import { useEffect, useState } from "react";
import {
    getAllFromEndpointHelper,
    handleUserPropsHelper,
} from "~/lib/helpers/signUp.helper";
import { StepProps } from "~/models/signUpSteps";
import Select from "react-select";

const Step3 = ({ user, setUser }: StepProps) => {
    const [selectedSkills, setSelectedSkills] = useState<any>(null);
    const [skillOptions, setSkillOptions] = useState<any[]>([]);
    useEffect(() => {
        getAllFromEndpointHelper(setSkillOptions, "skills");
    }, []);
    return (
        <>
            <label htmlFor="skill">Skill:</label>
            <Select
                isSearchable={true}
                isMulti={true}
                defaultValue={selectedSkills}
                value={selectedSkills}
                onChange={(newValue: any) => {
                    handleUserPropsHelper(
                        newValue,
                        setUser,
                        user,
                        setSelectedSkills,
                        "skills"
                    );
                }}
                options={skillOptions}
            />
        </>
    );
};

export default Step3;
