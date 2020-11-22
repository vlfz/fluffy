const config = require('./config');
// const con = require('mysql').createPool(config.database);
const randomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const Enmap = require("enmap");
const fs = require('fs');

const VK = require('node-vk-bot-api');
const bot = new VK(config.token);

bot.config = config;
bot.int = randomInteger;
bot.commands = new Enmap();
fs.readdir("./commands/", (err, files) => {
    if(err) return console.error(err);
    files.forEach((file) => {
        if(!file.endsWith(".js") || file.endsWith(".disabled.js")) return;
        
        let props = require(`./commands/${file}`);
        console.log(`* Loading in cache | ${props.settings.name}.js`);
        bot.commands.set(props.settings.name, props);
    });
});

bot.on((ctx) => {
    const messageContent = ctx.message.text || ctx.message.body;
    const messageAuthorID = ctx.message.user_id || ctx.message.from_id;

    if(messageContent.indexOf(config.prefix) !== 0) return;
    const args = messageContent.slice(config.prefix.length).trim().split(/ +/g);
    
    const command = bot.commands.get(args.shift().toLowerCase());
    if(!command || (command && (command.ownerOnly == true && messageAuthorID !== 179175035))) return;
    
    return command.run(bot, ctx, args, messageContent, messageAuthorID);
});

bot.startPolling((err) => {
    if(err) return console.error(err);
    else return console.info('* Bot has been launched.');
});