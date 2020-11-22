const fs = require('fs');

module.exports.settings = {
    name: 'help',
    description: 'то что ты сейчас читаешь, мяф',
    usage: null,
    ownerOnly: false
};

module.exports.run = (bot, ctx, args, messageContent, messageAuthorID) => {
    const config = bot.config;

    fs.readdir("./commands/", (err, files) => {
        if(err) return console.error(err);

        let commandsList = '';
        files.forEach((file) => {
            if(!file.endsWith(".js") || file.endsWith(".disabled.js")) return;

            let props = require(`./${file}`);
            if(props.settings.ownerOnly == false) commandsList += `${(props.settings.usage == null) ? `${config.prefix + props.settings.name}` : `${config.prefix + props.settings.name} ${props.settings.usage}`} - ${props.settings.description}\n`;
        });

        return ctx.reply(
            `Привет тебе, друг. Меня зовут Пушистик. (⊃｡•́‿•̀｡)⊃`+
            `\n\n`+
            `Команды бота:\n`+
            commandsList
        );
    });
};