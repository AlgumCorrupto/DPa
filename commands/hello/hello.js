const {SlashCommandBuilder} = require("discord.js")

// TL;DR simples ping 
module.exports = {
    data: new SlashCommandBuilder()
        .setName('tlgd')
        .setDescription('Verifica se o bot está ligado, tlgd?'),
    async execute(interaction) {
        await interaction.reply(`LETS FUCKING GOOOOOOOOO ${interaction.user.username}!!!!!!!!!!!!`)
    },
}