const Discord = require("discord.js")
const bot = new Discord.Client({intents: 3276799})
const config = require("./config")
const voiceDiscord = require("@discordjs/voice")
const { Message, MessageEmbed } = require("discord.js")
const { createAudioPlayer } = require('@discordjs/voice');
const BlaguesAPI = require('blagues-api');
const blagues = new BlaguesAPI(config.blagueapi);

const player = createAudioPlayer();

bot.login(config.token)

bot.on("ready", async () => {

    //when somone say "attardé", the bot will reply whit the car.png photo
    bot.on("messageCreate", message => {
        if (message.content === "attardé") {
            message.channel.send({files: ["./car.png"]})
        }
    })

    bot.on("messageCreate", message => {
        if (message.content.includes("viens")) {
            const channel = message.member.voice.channel;
            if (!channel) return message.channel.send("NON");
            const connection = voiceDiscord.joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });

        }
    })
    // creat command to disconnect the bot to the channel 
    bot.on("messageCreate", message => {
        if (message.content === "bouge") {
            const channel = message.member.voice.channel;
            if (!channel) return message.channel.send("NON");
            const connection = voiceDiscord.joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });
            connection.destroy()
        }
    })

    // creat command brother to play brother.mp3
    bot.on("messageCreate", message => {
        if (message.content.includes("brother")) {
            const channel = message.member.voice.channel;
            if (!channel) return message.channel.send("NON");
            const connection = voiceDiscord.joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });
            const resource = voiceDiscord.createAudioResource('./brother.mp3');
            player.play(resource);
            connection.subscribe(player);
            // disconnet after the song is finished
            player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
                connection.destroy();
            });
        }
    })
    
    // creat command to play a random joke
    bot.on("messageCreate", message => {
        if (message.content === "blague") {
            blagues.randomCategorized(
                blagues.categories.DARK
              ).then(joke => {
                message.channel.send(joke.joke)
                message.channel.send("||"+joke.answer+"||")
            })
        }
    })

    // creat a bot that when we say a word he will reply with an other word
    bot.on("messageCreate", message => {
        if (message.content.includes("daron")) {
            message.channel.send("il l'a abandonné")
        }
    })

    bot.on("messageCreate", message => {
        if (message.content.includes("david")) {
            message.channel.send("NON FDP")
        }
    })

    bot.on("messageCreate", message => {
        if (message.content.includes("enzo")) {
            message.channel.send(" Enculé, Pédé, Pédale, Tapette, Tantouze, Fiotte, Tafiole, Tarlouze, Sac à foutre, Petite bite, Couille molle, Salope, Chienne, Cagole, Travelo")
        }
    })



})

