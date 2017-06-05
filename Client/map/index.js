let fs = require('fs'),
    path = require('path'),
    sql = require('mssql'),
    deep = require('deep-diff'),
    pool,
    socket,
    interval;

async function connect (socket) {
    pool = await sql.connect('mssql://sa:Proprietor1@@localhost/testdb');
}

async function request () {
    const result = await sql.query`select * from position`;
    return result;
}

async function requestLatest () {
    const result = await sql.query`
        select * 
        from position 
        where time = (
            select max(time) 
            from position
        )`;

    return result;
}

async function start(socket) {
    socket = socket;

    console.log('start');
    // initListeners();
    await connect();

    console.log('connected');
    let latest = {};

    interval = setInterval(async () => {
        let {recordsets: record} = await requestLatest();

        if (deep(record[0][0], latest)) {
            latest = record[0][0];
            socket.emit('latest', record[0][0]);
            console.log('emmited', record[0][0]);
        }
    }, 2000);
}

function initListeners () {
    socket.on('stop', async function () {
        await pool.close();
        socket.emit('stop', 'stopped');
    });
}

module.exports = {
    connect,
    request,
    start
};