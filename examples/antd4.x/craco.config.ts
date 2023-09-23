export default {
    plugins: [
        {
            plugin: require("craco-less"),
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
