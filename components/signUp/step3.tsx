import { User } from "~/models";

type StepProps = {
    user: User;
    setUser: (data: User) => void;
};
const Step3 = ({ user, setUser }: StepProps) => {
    return (
        <>
            <label htmlFor="skill">Skill:</label>
            <input
                type="text"
                onChange={(e) =>
                    setUser({
                        ...user,
                        skills: [e.target.value],
                    })
                }
            />
        </>
    );
};

export default Step3;
