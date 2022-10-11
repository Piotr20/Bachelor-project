import React, { FC } from "react";
import styled from "styled-components";
import { link_color_list } from "~/lib/helpers/linkColor.helper";
import { link_size_list } from "~/lib/helpers/linkSize.helper";
import { LinkColor, LinkSize, LinkType } from "~/models/ui-types";
import { SvgIcon } from "../svg-icon";
import Link from "next/link";
import { LinkProps as NextLinkProps } from "next/link";
import { flexCenter } from "~/styles/style.helper";
import { colors } from "~/util/colorPalette";

type LinkProps = {
  /**
   * The path or URL to navigate to. This is the only required prop
   */
  href?: NextLinkProps["href"];
  /**
   * Refetch the page in the background. Any `<Link />` that is in the viewport (initially or through scroll) will be preloaded.
   * When prefetch is set to false, prefetching will still occur on hover.
   * Pages using Static Generation will preload JSON files with the data for faster page transitions.
   * _Prefetching is only enabled in production_.
   */
  prefetch?: NextLinkProps["prefetch"];
  /**
   *  Replace the current history state instead of adding a new url into the stack.
   */
  replace?: NextLinkProps["replace"];
  /**
   *  Scroll to the top of the page after a navigation
   */
  scroll?: NextLinkProps["scroll"];
  /**
   * Update the path of the current page without rerunning `getStaticProps`, `getServerSideProps` or `getInitialProps`
   */
  shallow?: NextLinkProps["shallow"];
  linkText: string;
  linkType?: LinkType;
  linkSize?: LinkSize;
  linkColor: LinkColor;
};

export const Links: FC<LinkProps> = ({
  linkText,
  linkType = "default",
  linkSize = "large",
  linkColor = "black",
  href,
  ...props
}) => {
  if (!href) {
    return null;
  }

  return (
    <Link href={href} passHref {...props}>
      <StyledLink>
        <LinkTextWrapper
          linkType={linkType}
          linkSize={linkSize}
          linkColor={linkColor}
        >
          {linkText}
        </LinkTextWrapper>
        <IconWrapper linkColor={linkColor}>
          {linkType === "icon" && (
            <SvgIcon
              svg="chevronRight"
              size={link_size_list[linkSize]?.sizeChevron}
            />
          )}
          {linkType === "circleIcon" && (
            <SvgIcon
              svg="chevronCircleRight"
              size={link_size_list[linkSize]?.sizeCircleChevron}
            />
          )}
        </IconWrapper>
      </StyledLink>
    </Link>
  );
};

const StyledLink = styled.a({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
});

const IconWrapper = styled.div<{
  linkColor: LinkColor;
}>(({ linkColor }) => ({
  padding: "0px 6px",
  stroke: link_color_list[linkColor]?.color,
  fill: link_color_list[linkColor]?.color,
  ...flexCenter,
}));

const LinkTextWrapper = styled.div<{
  linkType: LinkType;
  linkSize: LinkSize;
  linkColor: LinkColor;
}>(({ linkType, linkSize, linkColor }) => ({
  position: "relative",
  textDecoration: linkType === "underline" ? "underline" : "",
  textUnderlineOffset: linkType === "underline" ? "5px" : "",
  fontSize: link_size_list[linkSize]?.fontSize,
  color: link_color_list[linkColor]?.color,
  zIndex: 1,

  "&:after": {
    content: linkType === "highlighted" ? "''" : "",
    width: "100%",
    position: "absolute",
    bottom: 2,
    left: 0,
    height: "4px",
    backgroundColor:
      linkColor === "white"
        ? colors.secondary.darkYellow
        : colors.secondary.lightYellow,
    zIndex: -1,
  },
}));
