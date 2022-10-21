/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        styledComponents: true,
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            loader: "@svgr/webpack",
            options: {
                icon: true,
                expandProps: "end",
                titleProp: true,
            },
        });

        return config;
    },
    images: {
        domains: [
            "cdn.pixabay.com",
            "images.punkapi.com",
            "media-exp1.licdn.com",
        ],
    },
};

module.exports = nextConfig;
