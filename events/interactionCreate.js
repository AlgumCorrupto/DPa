const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		console.log("falaram")
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`Esse comando não existe cara! (ERRO: de acordo com meu banco de dados ${interaction.commandName} não existe, VIU?)`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'Oops, acho que você digitou o comando errado, faz o L agora, vai', ephemeral: true });
			} else {
				await interaction.reply({ content: 'Oops, acho que você digitou o comando errado, faz o L agora, vai', ephemeral: true });
			}
		}
	},
};