import { User } from "~/models";
import { StepProps } from "~/models/signUpSteps";

const Step1 = ({ user, setUser }: StepProps) => {
    return (
        <>
            <label htmlFor="position">Your position:</label>
            <input
                type="text"
                onChange={(e) => setUser({ ...user, role: e.target.value })}
            />
            <label htmlFor="experience">Years of experienc:</label>
            <input
                type="number"
                onChange={(e) =>
                    setUser({
                        ...user,
                        experienceYears: Number(e.target.value),
                    })
                }
            />
            <label htmlFor="department">Your department:</label>
            <input
                type="text"
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
            />
            <label htmlFor="phone">Your phone no:</label>
            <input
                type="text"
                onChange={(e) =>
                    setUser({ ...user, department: e.target.value })
                }
            />
        </>
    );
};

export default Step1;
