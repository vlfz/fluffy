const wrapper = require('../wrapper');
const moment = require('moment');

const tourURL = "https://bwh.vimeworld.org/tournament/^tourID";
const tourID = 1;

const statusProcessed = (status) => {
    switch ( Number(status) ) {
        case 0: return "анонс турнира";
        case 1: return "открыта регистрация";
        case 2: return "идёт игра";
        case 3: return "турнир завершён";
        default: return "что?";
    }
};

const toDate = (date) => {
    date = moment(
        (date == null) ? date : Number(date) * 1000
    ).locale('ru').format('LLL');

    if(date == "Invalid date") date = "неизвестно";
    return date;
};

module.exports.settings = {
    name: 'tour',
    description: 'информация о текущем турнире на VimeWorld',
    usage: null,
    ownerOnly: false
};

module.exports.run = async (bot, ctx) => {
    const data = await wrapper.tournaments();
    if(data.status == false || !data.object) return ctx.reply(
        (!data.msg) ? "Произошла ошибка при запросе данных с сайта." : data.msg
    );

    const members = await wrapper.tournamentMembers(tourID);
    if(members.status == false || !members.object) return ctx.reply(
        (!members.msg) ? "Произошла ошибка при запросе данных с сайта." : members.msg
    );
    
    let tour = data.object.list.find(tour => Number(tour.id) == tourID);
    if(!tour) return ctx.reply("В настройках функции неверно указан ID игры.");

    let message = [
        `➪ ${tour.name} | ${tour.game} (${tour.format})`,
        `➪ Статус: ${statusProcessed(tour.status)}`,
        `➪ Число участвующих команд: ${members.object.list.length}`,
        ``,
        `➪ Анонс турнира: ${toDate(tour.date_start)}`,
        // `➪ Открытие регистрации: ${toDate(tour.date_reg)}`,
        // `➪ Дата финальных игр: ${toDate(tour.date_game)}`,
        `➪ Дата окончания: ${toDate(tour.date_end)}`,
        ``,
        `➪ Подробнее: ${tourURL.replace("^tourID", tour.id)}`
    ];

    return ctx.reply(message.join("\n"));
};