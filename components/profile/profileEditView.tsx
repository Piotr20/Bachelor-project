import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavStore } from "~/store/store";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { SvgIcon } from "../svg-icon";
import { useSearchStore } from "~/store/searchStore";
import { Project, Skill, User } from "~/models";
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
import { getAllFromEndpointHelper, handleUserPropsHelper } from "~/lib/helpers/signUp.helper";
import { Button } from "../button/button";

const ProfileEditView = () => {
    const [selectedProjects, setSelectedProjects] = useState<any>(null);
    const [projectOptions, setProjectOptions] = useState<any[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<any>(null);
    const [skillOptions, setSkillOptions] = useState<any[]>([]);
    const router = useRouter();
    const { user, setUserData, setEditMode } = useUserStore((state) => ({
        user: state.user,
        setUserData: state.setUserData,
        setEditMode: state.setEditMode,
    }));

    useEffect(() => {
        getAllFromEndpointHelper(setProjectOptions, "projects");
        getAllFromEndpointHelper(setSkillOptions, "skills");
    }, []);

    let defaultProjects: any[] = [];
    user?.projects?.map((project: Project) => {
        defaultProjects.push({
            value: project?._id,
            label: project?.name,
        });
    });
    let defaultSkills: any[] = [];
    user?.skills?.map((skill: Skill) => {
        defaultSkills.push({
            value: skill?._id,
            label: skill?.name,
        });
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
            <Input
                type="text"
                placeholder={user?.role}
                defaultValue={user?.role}
                onChange={(e) =>
                    setUserData({
                        ...user,
                        role: (e.target as HTMLInputElement).value,
                    })
                }
            />
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
                placeholder={`${user?.experienceYears}`}
                defaultValue={user?.experienceYears}
                type="number"
                onChange={(e) =>
                    setUserData({
                        ...user,
                        experienceYears: Number((e.target as HTMLInputElement).value),
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
                        handleUserPropsHelper(newValue, setUserData, user, setSelectedProjects, "projects");
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
                    defaultValue={defaultSkills}
                    onChange={(newValue: any) => {
                        handleUserPropsHelper(newValue, setUserData, user, setSelectedSkills, "skills");
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
                            backgroundColor: colors.secondary.lightYellow + "40",
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
