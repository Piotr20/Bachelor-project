import { User } from "~/models";
import { StepProps } from "~/models/signUpSteps";
import { Input } from "../input/input";
import Select from "react-select";
import { departmentOptions } from "~/util/departmentOptions";
import styled from "styled-components";
import { colors } from "~/util/colorPalette";

const Step1 = ({ user, setUser }: StepProps) => {
    return (
        <>
            <Input
                placeholder="Enter your position"
                type="text"
                onChange={(e) =>
                    setUser({
                        ...user,
                        role: (e.target as HTMLInputElement).value,
                    })
                }
            />
            <StyledSelect>
                <Select
                    isSearchable={true}
                    placeholder="Chose your department"
                    onChange={(newValue: any) => {
                        setUser({
                            ...user,
                            department: newValue?.value,
                        });
                        console.log(user);
                    }}
                    options={departmentOptions}
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
                    }}
                />
            </StyledSelect>
            <Input
                placeholder="How long are you at IMPACT?"
                type="number"
                onChange={(e) =>
                    setUser({
                        ...user,
                        experienceYears: Number((e.target as HTMLInputElement).value),
                    })
                }
                additionalStyles={{
                    marginTop: "20px",
                }}
            />

            <Input
                placeholder="Enter phone number"
                type="text"
                onChange={(e) =>
                    setUser({
                        ...user,
                        phone: (e.target as HTMLInputElement).value,
                    })
                }
                additionalStyles={{
                    marginTop: "20px",
                }}
            />
        </>
    );
};

export default Step1;

export const StyledSelect = styled.div(() => ({
    marginTop: "14px",
    width: "100%",
    color: colors.primary.black,
    fontSize: "18px",
    border: "none",
    borderBottom: `1px solid ${colors.primary.black}`,
    outline: "none",
    ["div"]: {
        border: "none",
        outline: "none",
    },

    ["span"]: {
        border: "none",
        outline: "none",
    },
}));
