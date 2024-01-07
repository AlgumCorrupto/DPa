const pirata = require("../../utils/dbpirata.js")
const fronteira = require("../../utils/dbfronteira.js");
const { SlashCommandBuilder } = require("discord.js")
const formatter = require("../../utils/formatter.js")


/*
    Pegar playtime de um player, apenas job específico
*/

async function getPlaytime(player, job='Overall', mode='individual') {
    if(job != 'Overall') {
        if(!job.startsWith('Job')) {
            //Passager -> JobPassanger (friendly para database)
            job = 'Job'+job;
        }
    }

    // fetch dos trabalhos (provavelmente vai ser usado depois)
    let currJobs = await pirata.query("SELECT job_name FROM job;")
    let args;

    if(job == 'fronteira') {
        let playerId = await fronteira.query("SELECT user_id FROM player WHERE last_seen_user_name = $1;", [player])
        //console.log(playerId.rows[0].user_id);
        if(playerId.rows[0] == undefined){
            return "erro ao pegar ID do player, você digitou o nome corretamente?"
        }
        let response = await fronteira.query("SELECT TO_CHAR(time_spent, 'HH:MI') AS tempo FROM play_time WHERE player_id = $1 AND tracker = Overall;", [playerId.rows[0].user_id])
        //console.log(response.rows[0].tempo)
        if(response.rows[0] == undefined) {
            return "Oops, acho que esse trabalho não existe ou você nunca exerceu-o..."
        }
        return `jogador ${player} tem playtime de ${response.rows[0].tempo} no fronteira`;
    }


    let playerId = await pirata.query("SELECT user_id FROM player WHERE last_seen_user_name = $1;", [player])
    switch(mode) {
        case 'rank':
            args =  ( "SELECT TO_CHAR(play_time.time_spent, 'MM:DD:HH:MI') AS timespent, player.last_seen_user_name AS username, play_time.player_id AS playerId "
                    + "FROM play_time, player "
                    + "WHERE play_time.tracker = $1 AND play_time.player_id = player.user_id "
                    +  "ORDER BY play_time.time_spent DESC;" 
                    )
            let query = await pirata.query(args, [job]);
            let focused;
            if(playerId.rows[0] ==  undefined) {
                focused = formatter.focus(query)
            } else {
                focused = formatter.focus(query, playerId.rows[0].user_id);
            }

            let resp = `**Sua colocação no rank ${job}:** (MM:DD:HH:MI)\n`;
            for(let i = 0; i < focused.length; i++) {
                if(focused[i] == undefined) {
                    break;
                }
                // tem um bug aqui
                resp += `${i+focused.offset+1}. ${focused[i].username} Jogou por: ${focused[i].timespent};\n`
            }
            return resp

    case 'individual':
        if(playerId.rows[0] == undefined){
            return "erro ao pegar ID do player, você digitou o nome corretamente?"
        }
        args =  ( "SELECT TO_CHAR(time_spent, 'MM:DD:HH:MI') AS tempo "
                + "FROM play_time "
                + "WHERE player_id = $1 AND tracker = $2;"
                )
        let response = await pirata.query(args, [playerId.rows[0].user_id, job])
        if(response.rows[0] == undefined) {
            return "Oops, acho que esse trabalho não existe ou você nunca exerceu-o..."
        }    
        return `jogador ${player} tem playtime de ${response.rows[0].tempo} como ${job} (MM:DD:HH:MI)`

    default:
        return 'erro ao pegar tipo :(';

    }
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName('playtime-role')
        .setDescription("Ver o seu tempo de jogo")
        .addStringOption(option =>
            option.setName('player')
                .setDescription("player para verificar")
            )
        .addStringOption(option =>
            option.setName('job')
                .setDescription('o nome do job ')
            )
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Rankear ou individual')
            ),
    async execute(interaction) {
        const player = interaction.options.getString('player')
        let type;
        let job
        if(!(job = interaction.options.getString('job'))) {
            job = 'Overall';
        }
        if(!(type = interaction.options.getString('type'))) {
            type = 'individual';
        }
        let response;
        response = await getPlaytime(player, job, type)
        console.log(response)

        await interaction.reply(response);
    }
}
