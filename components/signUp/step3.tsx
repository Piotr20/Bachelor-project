import { useEffect, useState } from "react";
import {
    getAllFromEndpointHelper,
    handleUserPropsHelper,
    UserPropsSkillsHelper,
} from "~/lib/helpers/signUp.helper";
import { StepProps } from "~/models/signUpSteps";
import Select from "react-select";
import { StyledSelect } from "./step1";
import { colors } from "~/util/colorPalette";

const Step3 = ({ user, setUser }: StepProps) => {
    const [skillOptions, setSkillOptions] = useState<any[]>([]);
    const [selectedExpertSkills, setSelectedExpertSkills] = useState<any>(null);
    const [selectedMongoExpertSkills, setSelectedMongoExpertSkills] = useState<any>(null);
    const [selectedIntermidiateSkills, setSelectedIntermidiateSkills] = useState<any>(null);
    const [selectedMongoIntermidiateSkills, setSelectedMongoIntermidiateSkills] = useState<any>(null);
    const [selectedBasicSkills, setSelectedBasicSkills] = useState<any>(null);
    const [selectedMongoBasicSkills, setSelectedMongoBasicSkills] = useState<any>(null);
    useEffect(() => {
        getAllFromEndpointHelper(setSkillOptions, "skills");
    }, []);
    useEffect(() => {
        setUser({
            ...user,
            skills: [
                ...(selectedMongoBasicSkills || []),
                ...(selectedMongoIntermidiateSkills || []),
                ...(selectedMongoExpertSkills || []),
            ],
        });
    }, [selectedMongoBasicSkills, selectedMongoIntermidiateSkills, selectedMongoExpertSkills]);

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <>
            <StyledSelect>
                <Select
                    isSearchable={true}
                    isMulti={true}
                    placeholder="Expert skills (e.g. Next.js, Figma)"
                    defaultValue={selectedExpertSkills}
                    value={selectedExpertSkills}
                    onChange={(newValue: any) => {
                        setSelectedExpertSkills(newValue);
                        UserPropsSkillsHelper(
                            "expert",
                            newValue,
                            selectedMongoExpertSkills,
                            setSelectedMongoExpertSkills
                        );
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
                            backgroundColor: colors.secondary.red + "60",
                        }),
                    }}
                />
            </StyledSelect>
            <StyledSelect>
                <Select
                    isSearchable={true}
                    isMulti={true}
                    placeholder="Intermidiate skills (e.g. Next.js, Figma)"
                    defaultValue={selectedIntermidiateSkills}
                    value={selectedIntermidiateSkills}
                    onChange={(newValue: any) => {
                        setSelectedIntermidiateSkills(newValue);
                        UserPropsSkillsHelper(
                            "intermidiate",
                            newValue,
                            selectedMongoIntermidiateSkills,
                            setSelectedMongoIntermidiateSkills
                        );
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
            <StyledSelect>
                <Select
                    isSearchable={true}
                    isMulti={true}
                    placeholder="Basic skills (e.g. Next.js, Figma)"
                    defaultValue={selectedBasicSkills}
                    value={selectedBasicSkills}
                    onChange={(newValue: any) => {
                        setSelectedBasicSkills(newValue);
                        UserPropsSkillsHelper(
                            "basic",
                            newValue,
                            selectedMongoBasicSkills,
                            setSelectedMongoBasicSkills
                        );
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
                            backgroundColor: colors.secondary.green + "60",
                        }),
                    }}
                />
            </StyledSelect>
        </>
    );
};

export default Step3;
