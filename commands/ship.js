module.exports.settings = {
    name: 'ship',
    description: 'вероятность любви',
    usage: '<аргумент 1> | <аргумент 2>',
    ownerOnly: false
};

module.exports.run = (bot, ctx, args, messageContent, messageAuthorID) => {
    const randomInteger = bot.int;
    args = args.join(" ").split(" | ");

    if(!args[0] || !args[1]) return ctx.reply(`Недостаточно аргументов.`);
    return ctx.reply(`💚 Вероятность любви между ${args[0]} и ${args[1]} - ${randomInteger(0, 100)}%`);
};