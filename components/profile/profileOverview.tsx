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
                        {user?.department}
                    </Text>
                </IconContainer>
            </BioContainer>
            <PersonOverview data={user} />
        </>
    );
};

export default ProfileOverview;

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
