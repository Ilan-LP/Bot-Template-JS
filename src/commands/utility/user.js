const { SlashCommandBuilder, ContainerBuilder, TextDisplayBuilder, MessageFlags } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information you')
		.addUserOption(option =>
			option.setName('target')
				.setDescription('The user to get information about')
				.setRequired(false)),
	
	async execute(interaction) {
		const user = interaction.options.getUser('target') || interaction.user;

		const user_name = user.displayName;
		const user_tag = user.tag;
		let user_creation = user.createdAt;
		user_creation = `<t:${Math.floor(user_creation.getTime() / 1000)}:R>`;
		const user_id = user.id;

		const user_bot = user.bot ? 'Yes' : 'No';

		const component = [
			new ContainerBuilder().addTextDisplayComponents(
				new TextDisplayBuilder().setContent(`### ──┤ User info ├──\nName: **${user_name}**\nTag: **${user_tag}**\nCreation: **${user_creation}**\nBot: **${user_bot}**\nId: **${user_id}**\n\n`)
			)
		];

		if (interaction.guild) {
			in_guild = true;
			const user_member = await interaction.guild.members.fetch(user.id);
			const user_nickname = user_member.displayName;
			let joined = user_member.joinedAt;
			joined = `<t:${Math.floor(joined.getTime() / 1000)}:R>`;
			let premium = user_member.premiumSince;
			premium = premium ? `<t:${Math.floor(premium.getTime() / 1000)}:R>` : null;

			component[0].addTextDisplayComponents(
				new TextDisplayBuilder().setContent(`### ──┤ Member info ├──\nNickname: **${user_nickname}**\nJoined: **${joined}**\nBoosting since: **${premium ? premium : 'Not boosting'}**`)
			);
        }
        await interaction.reply({ components: component, flags: [MessageFlags.IsComponentsV2] });
    },
};