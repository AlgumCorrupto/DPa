const url = require("url");
const fs = require("fs")

module.exports = {
    genLink() {
        const configs = require("../config.json")   
        let invLink = new URL('https://discord.com/api/oauth2/authorize')
        invLink.search = `client_id=${configs.clientId}&permissions=${configs.permInt}&scope=bot%20applications.commands`
        configs.link = invLink.toString();

        fs.writeFile("../config.json", JSON.stringify(configs), (err) => {
            if(err)
                throw err
        })

        console.log(invLink.toString());
        return invLink;
    }

}
