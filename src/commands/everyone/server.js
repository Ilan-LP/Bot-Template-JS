const { SlashCommandBuilder, ContainerBuilder, TextDisplayBuilder, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Provides information about the server'),
    async execute(interaction) {
		if (!interaction.guild) {
			const component = [
				new ContainerBuilder().addTextDisplayComponents(
					new TextDisplayBuilder().setContent(`### ──┤ Error ├──\nThis command can only be used in a server`)
				)
			];

            await interaction.reply({ components: component, flags: [MessageFlags.IsComponentsV2] });
            return;
        }
		const server_name = interaction.guild.name;
		let server_creation = interaction.guild.createdAt;
		server_creation = `<t:${Math.floor(server_creation.getTime() / 1000)}:R>`;
		const server_id = interaction.guild.id;

		const server_owner = await interaction.guild.fetchOwner();
		const owner_member = await interaction.guild.members.fetch(server_owner.id);
		const owner_nickname = owner_member.displayName;
		const server_owner_tag = server_owner.user.tag;
		const server_owner_id = server_owner.id;

		const number_members = interaction.guild.memberCount;

		let number_channels = interaction.guild.channels.cache.size;
		number_channels -= interaction.guild.channels.cache.filter(c => c.type === 4 || c.type === 10 || c.type === 11).size;

		const number_roles = interaction.guild.roles.cache.size;
		const number_emojis = interaction.guild.emojis.cache.size;
		const number_stickers = interaction.guild.stickers.cache.size;

		const boost_level = interaction.guild.premiumTier;
		const boost_count = interaction.guild.premiumSubscriptionCount;

		const component = [
			new ContainerBuilder().addTextDisplayComponents(
				new TextDisplayBuilder().setContent(`### ──┤ Server info ├──\nName: **${server_name}**\nCreation: **${server_creation}**\nId: **${server_id}**\n\n`)
			).addTextDisplayComponents(
				new TextDisplayBuilder().setContent(`### ──┤ Owner ├──\nNickname: **${owner_nickname}**\nTag: **${server_owner_tag}**\nId: **${server_owner_id}**\n\n`)
			).addTextDisplayComponents(
				new TextDisplayBuilder().setContent(`### ──┤ Statistics ├──\nMembers: **${number_members}**\nChannels: **${number_channels}**\nRoles: **${number_roles}**\nEmojis: **${number_emojis}**\nStickers: **${number_stickers}**\n\n`)
			).addTextDisplayComponents(
				new TextDisplayBuilder().setContent(`### ──┤ Boost ├──\nLevel: **${boost_level}**\nBoosts: **${boost_count}**\n\n`)
			)
		];

        await interaction.reply({ components: component, flags: [MessageFlags.IsComponentsV2] });
    },
};