const pirata = require("../../utils/dbpirata.js")
const fronteira = require("../../utils/dbfronteira.js");
const { SlashCommandBuilder } = require("discord.js")

async function getPlaytime(player, job='Overall') {
    if(job != 'Overall') {
        if(!job.startsWith('Job')) {
            //Passager -> JobPassanger (friendly para database)
            job = 'Job'+job;
        }
    }

    // fetch dos trabalhos (provavelmente vai ser usado depois)
    let currJobs = await pirata.query("SELECT job_name FROM job;")

    if(job == 'fronteira') {
        try {
            let playerId = await fronteira.query("SELECT user_id FROM player WHERE last_seen_user_name = $1;", [player])
            //console.log(playerId.rows[0].user_id);
            if(playerId.rows[0] == undefined){
                return "erro ao pegar ID do player, você digitou o nome corretamente?"
            }
            let response = await fronteira.query("SELECT TO_CHAR(time_spent, 'HH24:MI') AS tempo FROM play_time WHERE player_id = $1 AND tracker = Overall;", [playerId.rows[0].user_id])
            //console.log(response.rows[0].tempo)
            if(response.rows[0] == undefined) {
                return "Oops, acho que esse trabalho não existe ou você nunca exerceu-o..."
            }
        
            return `jogador ${player} tem playtime de ${response.rows[0].tempo} no fronteira`;
            } catch(err) {
                if(playerId == undefined){
                    return "erro ao pegar ID do player, você digitou o nome corretamente?"
                }
                if(response == undefined) {
                    return "Oops, acho que esse trabalho não existe ou você nunca exerceu-o..."
                }
                console.log("eu acho que a aplicação vai crashar")
            }   
    }

    try {
    let playerId = await pirata.query("SELECT user_id FROM player WHERE last_seen_user_name = $1;", [player])
    //console.log(playerId.rows[0].user_id);
    if(playerId.rows[0] == undefined){
        return "erro ao pegar ID do player, você digitou o nome corretamente?"
    }
    let response = await pirata.query("SELECT TO_CHAR(time_spent, 'HH24:MI') AS tempo FROM play_time WHERE player_id = $1 AND tracker = $2;", [playerId.rows[0].user_id, job])
    //console.log(response.rows[0].tempo)
    if(response.rows[0] == undefined) {
        return "Oops, acho que esse trabalho não existe ou você nunca exerceu-o..."
    }

    return `jogador ${player} tem playtime de ${response.rows[0].tempo} como ${job}`
    } catch(err) {
        if(playerId == undefined){
            return "erro ao pegar ID do player, você digitou o nome corretamente?"
        }
        if(response == undefined) {
            return "Oops, acho que esse trabalho não existe ou você nunca exerceu-o..."
        }
        console.log("eu acho que a aplicação vai crashar")
    }   
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName('playtime-role')
        .setDescription("Ver o seu tempo de jogo")
        .addStringOption(option =>
            option.setName('player')
                .setDescription("player para verificar")
                .setRequired(true)
            )
        .addStringOption(option =>
            option.setName('job')
                .setDescription('o nome do job ')
            ),
    async execute(interaction) {
        const job = interaction.options.getString('job')
        const player = interaction.options.getString('player')

        let response;
        if(job) {
            response =await getPlaytime(player, job)
        }
        else {
            response = await getPlaytime(player)
        }

        console.log(response)

        await interaction.reply(response);
    }
}
