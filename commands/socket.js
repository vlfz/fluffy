let types = {
    "guild_exp_take": (data) => `Гильдия потеряла опыт в размере ${data.taken_exp} XP\nПричина: ${data.reason}`,
    "guild_exp_give": (data) => `Гильдия получила опыт в размере ${data.given_exp} XP\nПричина: ${data.reason}`,
    "guild_rename": (data) => `Гильдия сменила название с "${data.old_name}" на "${data.new_name}"`,
    "guild_member_new": (data) => `Игрок с ID ${data.inviter_id} пригласил в гильдию игрока с ID ${data.member_id}`,
    "guild_member_status": (data) => `Игрок с ID ${data.member_id} получил новый статус: "${data.from}" -> "${data.to}"`,
    "guild_transfer": (data) => `Гильдия сменила лидера: ID "${data.old_leader_id}" -> ID "${data.new_leader_id}"`,
    "guild_member_leave": (data) => `Игрок с ID ${data.member_id} вышел из гильдии\nПричина: ${(data.reason == "leave") ? "ПСЖ" : `помогли (ID: ${data.kicker_id})`}`,
    "guild_disband": (data) => `Гильдия была расформирована игроком с ID ${data.member_id}`,
    "guild_tag": (data) => `Гильдия сменила тэг с "${data.old_tag}" на "${data.new_tag}"`,
    "guild_color": (data) => `Гильдия сменила цвет тэга с "${data.old_color}" на "${data.new_color}"`,
    "guild_deposit": (data) => `Игрок с ID ${data.member_id} вложил в гильдию ${data.coins} монет`,
    "guild_perk_upgrade": (data) => `Гильдия прокачала перк "${data.perk_name}" до ${data.new_level}-го уровня (-${data.price} монет)`
};

module.exports.settings = {
    name: 'socket',
    description: 'прослушивание информации о гильдии Пушистый Патруль',
    usage: null,
    ownerOnly: true
};

module.exports.run = (bot, ctx) => {
    const io = require('socket.io-client')('http://localhost:12500');
    io.on('connect', () => {
        io.emit('login', { token: bot.config.vimeAuthToken });
        ctx.reply('[!] Подключился к сокету, ожидаю новых уведомлений');
    });

    io.on('vw_callback', (data) => {
        if(data.data.id == 356) return ctx.reply(`[!] ${types[data.type](data.data)}`);
    });
};