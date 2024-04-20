const Discord = require("discord.js")
const bot = new Discord.Client({intents: 3276799})
const config = require("./config")

bot.login(config.token)

bot.on("ready", async () => {

//when somone say "attardé", the bot will reply whit the car.png photo
bot.on("messageCreate", message => {
    if (message.content === "attardé") {
        message.channel.send({files: ["./car.png"]})
    }
})
})