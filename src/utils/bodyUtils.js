const getBodyData = (req) => {
    return new Promise((resolve, reject) => {
        try{
            let body = "";
            req.on("data", (chunk) => {
                body += chunk.toString();
            });
            req.on("end", async () => {
                if(!body){
                    reject();
                }else{
                    resolve(body);
                }
            })
        }catch(err){
            console.error(err);
        }
    });
};

module.exports = {
    getBodyData
}