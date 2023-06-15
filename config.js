let config = {
    port: 4001,
    emailDefaults: {
        from: "Smith <smith@gmx.com>",
        subject: "Send Email Using Node.js",
        text: "Hello world from node.js",
        html: "<b>Hello world from node.js</b>"
    }
};

module.exports = config;