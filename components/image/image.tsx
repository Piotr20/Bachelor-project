import styled from "styled-components";

import Image, { ImageProps, StaticImageData } from "next/image";

type Props = Omit<ImageProps, "src" | "alt"> & {
    ratio?:
        | "1/1"
        | "4/3"
        | "3/2"
        | "16/10"
        | "1.618/1"
        | "16:9"
        | "2/1"
        | "5/2"
        | "3/1"
        | "32/9"
        | "1/1.618"
        | "2/3"
        | "3/4";
    containerWidth?: number | string;
    containerHeight?: number | string;
    src?: string | StaticImageData | null;
    alt?: string | null;
};

const ImpactImage = ({
    src,
    ratio,
    containerHeight,
    containerWidth,
    alt,
    layout,
    width,
    height,
    loader,
    sizes,
    quality,
    priority,
    style,
    objectFit,
    objectPosition,
    onLoadingComplete,
    loading,
    blurDataURL,
    lazyBoundary,
    lazyRoot,
    unoptimized,
}: Props) => {
    if (ratio && width && height && layout) {
        throw new Error(
            "You have provided all ratio, width, height and layout parameters please specify either ratio and width/height or follow Next Image standards without using ratio"
        );
    }
    return (
        <NextImageWrapper
            containerRatio={ratio}
            width={containerWidth}
            height={containerHeight}
            layout={layout}
        >
            {src && alt ? (
                <Image
                    layout={layout}
                    alt={alt}
                    src={src}
                    width={width}
                    height={height}
                    loader={loader}
                    sizes={sizes}
                    quality={quality}
                    priority={priority}
                    style={style}
                    objectFit={objectFit}
                    objectPosition={objectPosition}
                    onLoadingComplete={onLoadingComplete}
                    loading={loading}
                    blurDataURL={blurDataURL}
                    lazyBoundary={lazyBoundary}
                    lazyRoot={lazyRoot}
                    unoptimized={unoptimized}
                />
            ) : (
                <img
                    src="/images/placeholderImage.jpg"
                    alt="placeholder image"
                />
            )}
        </NextImageWrapper>
    );
};

export default ImpactImage;

export const NextImageWrapper = styled.div<{
    containerRatio?: string;
    width?: number | string;
    height?: number | string;
    layout?: string;
}>(({ containerRatio, width, height, layout }) => ({
    aspectRatio: containerRatio,
    width: width,
    height: height,
    ...(layout === "fill" ? { position: "relative" } : null),
}));
