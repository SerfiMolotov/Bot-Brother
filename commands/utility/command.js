const { SlashCommandBuilder } = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("aide")
    .setDescription("Liste de toutes les commandes disponibles"),
  async execute(interaction) {
    const commands = interaction.client.commands;
    const embed = {
      title: "Liste des commandes",
      color: 0x0099ff,
      description: "Voici la liste des commandes disponibles",
      fields: [],
      image: {
		url: 'https://i.postimg.cc/J7yh6YRH/rangaroo.png',
    },
      footer: {
		text: 'Je me régale + ENZO BAISE TA MERE',
      }
    };

    commands.forEach((command) => {
      embed.fields.push({
        name: command.data.name,
        value: command.data.description,
      });
    });

    await interaction.reply({ embeds: [embed] });
  },
};
