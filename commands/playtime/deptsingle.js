const pirata = require("../../utils/dbpirata.js")
const jobParser = require("../../utils/getDeptJobs.js")
const { SlashCommandBuilder } = require('discord.js')


async function getPlaytime(player, dept) {
    let jobs;
    let params = ''

    let playerId;
    let argsPlayer = (  "SELECT user_id "
                     +  "FROM player "
                     +  "WHERE last_seen_user_name = $1;"
                     )

    if(!(playerId = await pirata.query(argsPlayer, [player]))) {
        return "Nome do player não encontrado"
    }
    if(!(jobs = jobParser.get(dept))) {
        return "Digite o nome do departamento de acordo com a lista"
    }

    playerId = playerId.rows[0].user_id;

    params = jobParser.makeQuery(jobs);

    //console.log("SELECT tracker AS jobs, TO_CHAR(time_spent, 'HH:MI') AS timespent FROM play_time WHERE (" +
    //params + 
    //") AND player_id = $1 ORDER BY time_spent;")

    let query = await pirata.query(("SELECT tracker AS jobs, TO_CHAR(time_spent, 'MM:DD:HH:MI') AS timespent FROM play_time WHERE (" +
    params + 
    ") AND player_id = $1 ORDER BY time_spent DESC;"), [playerId])



    let response = `** ${player} como ${dept}**, vejamos suas estatísticas (MM:DD:HH:MI)\n`

    for(let i = 0; i < query.rowCount; i++) {
        response += `${query.rows[i].jobs}: ${query.rows[i].timespent}\n`;
    }

    return response
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName('playtime-dept')
        .setDescription("Ver o seu tempo de jogo")
        .addStringOption(option =>
            option.setName('player')
                .setDescription("player para verificar")
                .setRequired(true)
            )
        .addStringOption(option =>
            option.setName('dept')
                .setDescription('o nome do departamento')
            ),
    async execute(interaction) {
        const dept = interaction.options.getString('dept')
        const player = interaction.options.getString('player')

        let response = await getPlaytime(player, dept)

        await interaction.reply(response);
    }
}
