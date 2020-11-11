module.exports = {
    publicPath: "/cssgrad/",
    css: {
        loaderOptions: {
            postcss: {
                ident: "postcss",
                plugins: [
                    require("tailwindcss"),
                    require("autoprefixer"),
                ],
            },
        },
    },
}
