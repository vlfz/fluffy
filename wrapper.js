var XML = require("xmlhttprequest").XMLHttpRequest;
module.exports.pixelInfo = () => {
    var xhr = new XML();
    xhr.open('GET', 'https://vimeworld.ru/pixelbattle/meta.json', false);
    xhr.send();

    if(xhr.status !== 200) return { error: { code: "OopsItsError", message: "Какая-то дичь только что сейчас произошла. Извините, сейчас исправим. Код ошибки: " + xhr.status } };
    else return JSON.parse(xhr.responseText);
};