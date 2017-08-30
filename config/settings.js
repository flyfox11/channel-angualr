var path = require('path');

var settings = {
    fileUploadPath: 'd:\\file',
    port: process.env.NODE_PORT || 3009,
    HTTP_PORT:3009,
    HTTPS_PORT:3010,
    HTTP_ON:true,
    HTTPS_ON:false,
    server_host: "localhost",
    database: {
        protocol: "mysql",
        query: {pool: true},
        host: "59.110.42.180",
        database: "dong",
        user: "root",
        password: "4444"
    }
};

module.exports = settings;
