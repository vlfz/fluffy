const wrapper = require('../wrapper');
const ownTags = bot.config.ownTags;
const note = {
    exists: true,
    message: "https://youtu.be/tBFyxm9sHww"
};

module.exports.settings = {
    name: 'top',
    description: 'топ-9 по закрашенным пикселям в Pixel Battle',
    usage: null,
    ownerOnly: false
};

module.exports.run = (bot, ctx) => {
    const data = wrapper.pixelInfo();
    if(data.error) return ctx.reply(data.error.message);
    
    let readOnly = false;
    if(data.image.includes(`${new Date().getUTCFullYear()}.png`)) readOnly = true;
    
    let tagPlace = 0;
    let top9 = [];
    for (let info of data.top) {
        tagPlace++;
        top9.push(`• ${tagPlace} место - ${info.tag} (${((ownTags.includes(info.tag)) ? "😌 | " : "") + info.pixels} п.)`);
    }

    let message = [
        `➪ Статус игры: ${(readOnly == false) ? "доступна" : "только просмотр"}`,
        `➪ Текущая карта пиксель-баттла: https://vime.one/pb`,
        `➪ Топ-9 по закрашенным пикселям:\n${top9.join("\n")}`,
        (note.exists == true) ? `\n➪ Примечание: ${note.message}` : ``
    ];

    return ctx.reply(message.join("\n"));
};