import { User } from "~/models";
import { StepProps } from "~/models/signUpSteps";
import { Input } from "../input/input";

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
            <Input
                placeholder="Your department"
                type="text"
                onChange={(e) =>
                    setUser({
                        ...user,
                        department: (e.target as HTMLInputElement).value,
                    })
                }
                additionalStyles={{
                    marginTop: "20px",
                }}
            />
            <Input
                placeholder="How long are you at IMPACT?"
                type="number"
                onChange={(e) =>
                    setUser({
                        ...user,
                        experienceYears: Number(
                            (e.target as HTMLInputElement).value
                        ),
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
