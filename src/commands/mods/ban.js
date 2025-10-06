const { SlashCommandBuilder, PermissionsBitField, ContainerBuilder, TextDisplayBuilder, MessageFlags } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban a user from the server')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to ban')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for the ban')
                .setRequired(false)
                .setMaxLength(200))
        .setDefaultMemberPermissions(PermissionsBitField.Flags.BanMembers),
	async execute(interaction) {
        const target = interaction.options.getUser('target');
        let reason = interaction.options.getString('reason') || 'No reason provided';
        reason = 'Author: ' + interaction.user.tag + ' | Reason: ' + reason; 

        if (!interaction.guild) {
			const component = [
				new ContainerBuilder().addTextDisplayComponents(
					new TextDisplayBuilder().setContent(`### ──┤ Error ├──\nThis command can only be used in a server`)
				)
			];

            await interaction.reply({ components: component, flags: [MessageFlags.IsComponentsV2] });
            return;
        }

        const member = await interaction.guild.members.fetch(target.id).catch(() => null);
        if (!member) {
            const component = [
                new ContainerBuilder().addTextDisplayComponents(
                    new TextDisplayBuilder().setContent(`### ──┤ Error ├──\nUser not found in the server`)
                )
            ];
            await interaction.reply({ components: component, flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral] });
            return;
        }
        
        try {
            await member.ban({ reason: reason });
            const component = [
                new ContainerBuilder().addTextDisplayComponents(
                    new TextDisplayBuilder().setContent(`### ──┤ Ban ├──\nBanned ${target.tag} from the server`)
                )
            ];
            await interaction.reply({ components: component, flags: [MessageFlags.IsComponentsV2] });
        } catch (error) {
            const component = [
                new ContainerBuilder().addTextDisplayComponents(
                    new TextDisplayBuilder().setContent(`### ──┤ Error ├──\nFailed to ban ${target.tag}. Do I have the necessary permissions ?`)
                )
            ];
            await interaction.reply({ components: component, flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral] });
        }
	},
};