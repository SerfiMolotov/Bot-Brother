const Discord = require("discord.js")
const bot = new Discord.Client({intents: 3276799})
const config = require("./config")

bot.login(config.token)

bot.on("ready", async () => {
    bot.on("messageCreate", async message => {
        if (message.content === "!ping" && !message.author.bot) {
            message.reply("!ping")
            // create a function to take a number between 1 and 10 and return a random number between 1 and 10
            function randomNum() {
                return Math.floor(Math.random() * 10) + 1
            }
            // transform to string
            const randomNumString = randomNum().toString()
            // send it to the channel
            message.channel.send(randomNumString)
        }
    })

    // create a command when user type !avatar send his avatar url in the channel
    bot.on("messageCreate", async message => {
        if (message.content === "!avatar" && !message.author.bot) {
            message.reply(message.author.displayAvatarURL())
        }
    })

    
    // create a command to perform calculations
    bot.on("messageCreate", async message => {
        if (!message.author.bot && message.content.startsWith("!calculate")) {
            // extract the calculation expression from the message content
            const expression = message.content.slice(11).trim();

            // evaluate the expression using the eval() function
            try {
                const result = eval(expression);
                message.channel.send(`The result is: ${result}`);
            } catch (error) {
                message.channel.send("Invalid expression");
            }
        }
    });
})