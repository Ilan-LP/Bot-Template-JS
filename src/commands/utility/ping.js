const { SlashCommandBuilder, ContainerBuilder, TextDisplayBuilder, MessageFlags } = require('discord.js');
const { uptime } = require('process');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('View bot information'),
	async execute(interaction) {
		let responde_time = Date.now();

		let api_latency = Math.round(interaction.client.ws.ping);
		if (api_latency < 0) {
			api_latency = 0;
		}

		const api_latency_text = `${api_latency}ms`;

		const bot_uptime = Math.round(uptime());
		let bot_uptime_text = `${bot_uptime}s`;
		if (bot_uptime > 60) {
			bot_uptime_text = `${Math.floor(bot_uptime / 60)} minutes`;
		}
		if (bot_uptime > 3600) {
			bot_uptime_text = `${Math.floor(bot_uptime / 3600)} hours`;
		}
		if (bot_uptime > 86400) {
			bot_uptime_text = `${Math.floor(bot_uptime / 86400)} days`;
		}
		if (bot_uptime > 604800) {
			bot_uptime_text = `${Math.floor(bot_uptime / 604800)} weeks`;
		}
		if (bot_uptime > 2592000) {
			bot_uptime_text = `${Math.floor(bot_uptime / 2592000)} mounths`;
		}
		if (bot_uptime > 31536000) {
			bot_uptime_text = `${Math.floor(bot_uptime / 31536000)} years`;
		}

		const guilds = await interaction.client.guilds.fetch();

		const ram = process.memoryUsage().heapUsed / 1024 / 1024;
		const ram_text = `${Math.round(ram * 100) / 100} MB`;

		const node_version = process.version;

		const discordjs_version = require('discord.js').version;

		responde_time = Date.now() - responde_time;
		let responde_time_text = `${responde_time}ms`;

		let component = [
			new ContainerBuilder().addTextDisplayComponents(
				new TextDisplayBuilder().setContent(`### ──┤ Network ├──\nAPI Latency: **${api_latency_text}**\nResponse Time: **${responde_time_text}**\n\n`)
			).addTextDisplayComponents(
				new TextDisplayBuilder().setContent(`### ──┤ System ├──\nBot Uptime: **${bot_uptime_text}**\nRam Usage: **${ram_text}**\n\n`)
			).addTextDisplayComponents(
				new TextDisplayBuilder().setContent(`### ──┤ Environnement ├──\nGuilds: **${guilds.size}**\nNode.js Version: **${node_version}**\nDiscord.js Version: **${discordjs_version}**`)
			)
		];
		
		await interaction.reply({ components: component, flags: [MessageFlags.IsComponentsV2] });
	},
};