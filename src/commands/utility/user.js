const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information you'),
	async execute(interaction) {
		await interaction.reply(`This command was run by ${interaction.user.username}, you joined on ${interaction.member.joinedAt}`);
	},
};