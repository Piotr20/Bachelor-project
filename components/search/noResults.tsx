import styled from "styled-components";
import ImpactImage from "../image/image";
import NoResultsImage from "~/public/images/no-results.png";
import Text from "../typography/text";
import { colors } from "~/util/colorPalette";
const NoResults = () => {
    return (
        <NoResultsWrapper>
            <ImpactImage
                src={NoResultsImage}
                alt="No results icon"
                containerWidth="100%"
                containerStyles={{
                    display: "flex",
                    justifyContent: "center",
                }}
            />
            <Text tag="h3">We couldn&apos;t find any matches</Text>
            <Text
                tag="h5"
                additionalStyles={{
                    color: colors.base.grey500,
                }}
            >
                Check your spelling or broaden your search
            </Text>
        </NoResultsWrapper>
    );
};

export default NoResults;

export const NoResultsWrapper = styled.div({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "24px",
});
