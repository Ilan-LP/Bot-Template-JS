const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('View bot information'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};