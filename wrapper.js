const fetch = require('node-fetch');
const urls = {
    pb: "https://vimeworld.ru/pixelbattle/meta.json",
    userByToken: "https://api.vimeworld.ru/misc/token/^token",
    vwevents: {
        tournaments: "https://bwh.vimeworld.org/ajax/main/load.tournament.php",
        tournamentMembers: "https://bwh.vimeworld.org/ajax/tournament/load.members.php"
    }
};

module.exports = {
    pixelInfo: () => new Promise((ok, eject) =>
        fetch(urls.pb).then(r => r.json()).then(ok).catch(eject)
    ),
    tournaments: () => new Promise((ok, eject) =>
        fetch(urls.vwevents.tournaments, {
            headers: { "x-requested-with": "XMLHttpRequest"
        } }).then(r => r.json()).then(ok).catch(eject)
    ),
    tournamentMembers: (tourID) => new Promise((ok, eject) =>
        fetch(urls.vwevents.tournamentMembers, {
            method: "POST", body: `tournament=${tourID}&page=0`, headers: { "Content-Type": "application/x-www-form-urlencoded", "x-requested-with": "XMLHttpRequest"
        } }).then(r => r.json()).then(ok).catch(eject)
    ),
    getUser: (token) => new Promise((ok, eject) =>
        fetch(urls.userByToken.replace("^token", token)).then(r => r.json()).then(ok).catch(eject)
    ),
    request: (uri) => new Promise((ok, eject) =>
        fetch(uri).then(r => r.json()).then(ok).catch(eject)
    )
};