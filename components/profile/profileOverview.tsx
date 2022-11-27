import styled from "styled-components";
import { SvgIcon } from "../svg-icon";
import { User } from "~/models";
import { ProjectDetails } from "../slider/bios/sliderBioPerson";

import PersonOverview from "../slider/overviews/overviewPerson";

import Text from "../typography/text";
import { colors } from "~/util/colorPalette";
import { mq } from "~/util/media-queries";

type ProfileOverviewProps = {
    user: User;
};

const ProfileOverview = ({ user }: ProfileOverviewProps) => {
    return (
        <>
            <BioContainer>
                <Text
                    tag="h5"
                    additionalStyles={{
                        marginTop: "8px",
                        color: colors.primary.lightGrey,
                    }}
                >
                    {user?.role}
                </Text>

                <IconContainer>
                    <SvgIcon svg="location" />
                    <Text
                        tag="p"
                        additionalStyles={{
                            marginLeft: "6px",
                        }}
                    >
                        {user?.department + ", " + user?.location}
                    </Text>
                </IconContainer>
                <ProjectDetails>
                    <Text
                        tag="h5"
                        additionalStyles={{
                            marginBottom: "12px",
                        }}
                    >
                        Contact
                    </Text>
                    <StyledAnchor>
                        <SvgIcon svg="phone" />
                        {user?.phone}
                    </StyledAnchor>
                    <StyledAnchor>
                        <SvgIcon svg="email" />
                        {user?.email}
                    </StyledAnchor>
                </ProjectDetails>
            </BioContainer>
            <PersonOverview data={user} />
        </>
    );
};

export default ProfileOverview;

export const BioContainer = styled.div({
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

export const StyledAnchor = styled.span({
    fontFamily: "Flama Condensed",
    display: "flex",
    width: "fit-content",
    alignItems: "center",
    textDecoration: "none",
    fontSize: "16px",
    color: colors.primary.black,
    transition: "all 0.3s ease",
    ["&>span:nth-of-type(1)"]: {
        marginRight: "8px",
        ["path"]: {
            fill: colors.primary.black,
        },
        width: "20px !important",
        height: "20px !important",
        [mq("lg")]: {
            width: "24px !important",
            height: "24px !important",
        },
    },
});
