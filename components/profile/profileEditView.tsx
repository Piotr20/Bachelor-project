import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavStore } from "~/store/store";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { SvgIcon } from "../svg-icon";
import { useSearchStore } from "~/store/searchStore";
import { Project, Skill, User, UserSkill } from "~/models";
import SliderBioPerson from "../slider/bios/sliderBioPerson";
import { mq } from "~/util/media-queries";
import PersonOverview from "../slider/overviews/overviewPerson";
import { useUserStore } from "~/store/userStore";
import useAuth from "~/hooks/useAuth";
import Text from "../typography/text";
import { colors } from "~/util/colorPalette";
import ImpactImage from "../image/image";
import { Input } from "../input/input";
import { StyledSelect } from "../signUp/step1";
import { departmentOptions } from "~/util/departmentOptions";
import Select from "react-select";
import {
    getAllFromEndpointHelper,
    handleUserPropsHelper,
    UserPropsSkillsHelper,
} from "~/lib/helpers/signUp.helper";
import { Button } from "../button/button";
import { positionsOptions } from "~/util/positionOptions";

const ProfileEditView = () => {
    const [selectedProjects, setSelectedProjects] = useState<any>();
    const [projectOptions, setProjectOptions] = useState<any[]>();
    const [selectedSkills, setSelectedSkills] = useState<any>();
    const [skillOptions, setSkillOptions] = useState<any[]>();
    const [selectedExpertSkills, setSelectedExpertSkills] = useState<any>();
    const [selectedMongoExpertSkills, setSelectedMongoExpertSkills] =
        useState<any>();
    const [selectedIntermidiateSkills, setSelectedIntermidiateSkills] =
        useState<any>();
    const [
        selectedMongoIntermidiateSkills,
        setSelectedMongoIntermidiateSkills,
    ] = useState<any>();
    const [selectedBasicSkills, setSelectedBasicSkills] = useState<any>();
    const [selectedMongoBasicSkills, setSelectedMongoBasicSkills] =
        useState<any>();
    const router = useRouter();
    const { user, setUserData, setEditMode } = useUserStore((state) => ({
        user: state.user,
        setUserData: state.setUserData,
        setEditMode: state.setEditMode,
    }));

    useEffect(() => {
        let defaultBasicSkills: UserSkill[] = [];
        let defaultIntermidiateSkills: UserSkill[] = [];
        let defaultExpertSkills: UserSkill[] = [];
        user?.skills?.forEach((userSkill: any) => {
            if (userSkill?.expertise === "basic") {
                defaultBasicSkills.push({
                    skill: userSkill?.skill?._id,
                    expertise: "basic",
                });
            }
            if (userSkill?.expertise === "intermidiate") {
                defaultIntermidiateSkills.push({
                    skill: userSkill?.skill?._id,
                    expertise: "intermidiate",
                });
            }
            if (userSkill?.expertise === "expert") {
                defaultExpertSkills.push({
                    skill: userSkill?.skill?._id,
                    expertise: "expert",
                });
            }
        });
        setSelectedMongoBasicSkills(defaultBasicSkills);
        setSelectedMongoIntermidiateSkills(defaultIntermidiateSkills);
        setSelectedMongoExpertSkills(defaultExpertSkills);
    }, []);

    useEffect(() => {
        getAllFromEndpointHelper(setProjectOptions, "projects");
        getAllFromEndpointHelper(setSkillOptions, "skills");
    }, []);

    useEffect(() => {
        if (
            selectedMongoBasicSkills ||
            selectedMongoIntermidiateSkills ||
            selectedMongoExpertSkills
        ) {
            setUserData({
                ...user,
                skills: [
                    ...(selectedMongoBasicSkills || []),
                    ...(selectedMongoIntermidiateSkills || []),
                    ...(selectedMongoExpertSkills || []),
                ],
            });
        }
    }, [
        selectedMongoBasicSkills,
        selectedMongoIntermidiateSkills,
        selectedMongoExpertSkills,
    ]);

    let defaultProjects: any[] = [];
    user?.projects?.map((project: Project) => {
        defaultProjects.push({
            value: project?._id,
            label: project?.name,
        });
    });
    let basicSkills: any[] = [];
    let intermidiateSkills: any[] = [];
    let expertSkills: any[] = [];

    user?.skills?.map((userSkill: any) => {
        if (userSkill?.expertise === "basic") {
            basicSkills?.push({
                value: userSkill?.skill?._id,
                label: userSkill?.skill?.name,
            });
        }
        if (userSkill?.expertise === "intermidiate") {
            intermidiateSkills?.push({
                value: userSkill?.skill?._id,
                label: userSkill?.skill?.name,
            });
        }
        if (userSkill?.expertise === "expert") {
            expertSkills?.push({
                value: userSkill?.skill?._id,
                label: userSkill?.skill?.name,
            });
        }
    });

    async function updateUser() {
        const response = await fetch(`./api/user/updateUser`, {
            method: "POST",
            body: JSON.stringify(user),
        });
        const mongoUser: User = await response.json();
        setUserData(mongoUser);
        router.reload();
        setEditMode(false);
    }
    useEffect(() => {
        console.log(user?.skills);
    }, [user?.skills]);

    return (
        <ProfileOverview>
            <Text
                tag="h4"
                additionalStyles={{
                    marginBottom: "12px",
                }}
            >
                Profile
            </Text>
            <StyledSelect>
                <Select
                    isSearchable={true}
                    placeholder="Chose your position"
                    defaultValue={{
                        value: user?.role,
                        label: user?.role,
                    }}
                    onChange={(newValue: any) => {
                        setUserData({
                            ...user,
                            role: newValue?.value,
                        });
                    }}
                    options={positionsOptions}
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
                    }}
                />
            </StyledSelect>
            <StyledSelect>
                <Select
                    isSearchable={true}
                    defaultValue={{
                        label: user?.department,
                        value: user?.department,
                    }}
                    placeholder="Chose your department"
                    onChange={(newValue: any) => {
                        setUserData({
                            ...user,
                            department: newValue?.value,
                        });
                        console.log(user);
                    }}
                    options={departmentOptions}
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
                    }}
                />
            </StyledSelect>
            <Input
                defaultValue={user?.location}
                placeholder={user?.location}
                type="text"
                onChange={(e) =>
                    setUserData({
                        ...user,
                        location: (e.target as HTMLInputElement).value,
                    })
                }
                additionalStyles={{
                    marginTop: "20px",
                }}
            />

            <Input
                placeholder={user?.phone}
                defaultValue={user?.phone}
                type="text"
                onChange={(e) =>
                    setUserData({
                        ...user,
                        phone: (e.target as HTMLInputElement).value,
                    })
                }
                additionalStyles={{
                    marginTop: "20px",
                }}
            />
            <Text
                tag="h4"
                additionalStyles={{
                    marginTop: "32px",
                    marginBottom: "12px",
                    [mq("lg")]: {
                        marginTop: "40px",
                    },
                }}
            >
                Projects
            </Text>
            <StyledSelect>
                <Select
                    isSearchable={true}
                    isMulti={true}
                    defaultValue={defaultProjects}
                    onChange={(newValue: any) => {
                        handleUserPropsHelper(
                            newValue,
                            setUserData,
                            user,
                            setSelectedProjects,
                            "projects"
                        );
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
                            backgroundColor:
                                colors.secondary.lightYellow + "40",
                        }),
                    }}
                />
            </StyledSelect>
            <Text
                tag="h4"
                additionalStyles={{
                    marginTop: "32px",
                    marginBottom: "12px",
                    [mq("lg")]: {
                        marginTop: "40px",
                    },
                }}
            >
                Skills
            </Text>
            <StyledSelect>
                <Select
                    isSearchable={true}
                    isMulti={true}
                    placeholder="Expert skills (e.g. Next.js, Figma)"
                    defaultValue={expertSkills}
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
                    defaultValue={intermidiateSkills}
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
                            backgroundColor:
                                colors.secondary.lightYellow + "60",
                        }),
                    }}
                />
            </StyledSelect>
            <StyledSelect>
                <Select
                    isSearchable={true}
                    isMulti={true}
                    placeholder="Basic skills (e.g. Next.js, Figma)"
                    defaultValue={basicSkills}
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
            <Button
                onClick={updateUser}
                kind="primary"
                additionalStyles={{
                    marginTop: "32px",
                    marginLeft: "auto",
                }}
            >
                Save
            </Button>
        </ProfileOverview>
    );
};

export default ProfileEditView;

export const ProfileOverview = styled.div({
    marginTop: "40px",
    display: "flex",
    flexDirection: "column",
    padding: "0 24px 24px 24px",
    [mq("lg")]: {
        width: "80%",
        margin: "0 auto",
        marginTop: "52px",
    },
});

export const BioContainer = styled.div({
    marginTop: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
});

export const IconContainer = styled.div({
    display: "flex",
    marginTop: "8px",
    opacity: 0.8,
    ["svg"]: {
        width: "24px !important",
        height: "24px !important",
    },
});
