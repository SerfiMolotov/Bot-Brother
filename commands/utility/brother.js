const { SlashCommandBuilder } = require("discord.js");
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  getVoiceConnection
} = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("brother")
    .setDescription("Invoque le brother !"),
  async execute(interaction) {
    const channel = interaction.member.voice.channel;

    if (!channel) {
      await interaction.reply("You need to be in a voice channel to use this command!");
      return;
    }

    // Attempt to get an existing connection or create a new one
    let connection = getVoiceConnection(channel.guild.id);
    if (!connection) {
      connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });
    }

    const audioPlayer = createAudioPlayer();
    const audioResource = createAudioResource('music/brother.mp3');
    const subscription = connection.subscribe(audioPlayer);

    if (subscription) {
      audioPlayer.play(audioResource);
      await interaction.reply("Playing audio!");
      setTimeout(() => {
        subscription.unsubscribe();
        connection.destroy(); // Optionally destroy the connection if no longer needed
      }, 5000); // Stops playing after 5 seconds
    } else {
      await interaction.reply("Failed to play audio.");
    }
  },
};
