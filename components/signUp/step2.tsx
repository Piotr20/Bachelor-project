import { User } from "~/models";

type StepProps = {
    user: User;
    setUser: (data: User) => void;
};
const Step2 = ({ user, setUser }: StepProps) => {
    return (
        <>
            <label htmlFor="project">Project:</label>
            <input
                type="text"
                onChange={(e) =>
                    setUser({
                        ...user,
                        projects: [e.target.value],
                    })
                }
            />
        </>
    );
};

export default Step2;
