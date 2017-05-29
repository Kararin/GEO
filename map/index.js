let fs = require('fs'),
    path = require('path');

async function emitData (socket) {
    let mapData = await loadData(),
        i = 0,
        interval = setInterval(() => {
                if (mapData[i]) {
                    socket.emit('mapData', mapData[i++]);
                }
        }, 2000);
}

async function loadData () {
    return new Promise(function (resolve, reject) {
        fs.readFile(path.resolve('map/data.json'),'utf-8',  (err, data) => {
            if (err) {
                console.log(err);
                reject(err);
            }

            resolve(JSON.parse(data));
        });
    });
}

module.exports.emitData = emitData;