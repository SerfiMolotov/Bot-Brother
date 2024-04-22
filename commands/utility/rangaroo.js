const { SlashCommandBuilder } = require("discord.js");

//creat a command that show a image 
module.exports = {
  data: new SlashCommandBuilder()
    .setName("rangaroo")
    .setDescription("INVOQUE LE RANGAROO"),
  async execute(interaction) {
    await interaction.reply({
      files: ['./images/rangaroo.png'],
    });
  },
};