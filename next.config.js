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
            "",
            "cdn.pixabay.com",
            "images.punkapi.com",
            "media-exp1.licdn.com",
            "assets.stickpng.com",
            "repository-images.githubusercontent.com",
            "www.bog-ide.dk",
            "upload.wikimedia.org",
            "raw.githubusercontent.com",
            "www.tutorialsteacher.com",
            "www.timelog.com",
            "drive.google.com",
            "l.facebook.com",
            "www.google.com ",
            "github.com",
        ],
    },
};

module.exports = nextConfig;
