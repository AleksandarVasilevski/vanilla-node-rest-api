const fs = require("fs");

const writeDataToFile = (filename, content) => {
    fs.writeFileSync(filename, JSON.stringify(content), "utf-8", (err) => {
        console.error(err);
    });
};

module.exports = {
    writeDataToFile,
};
