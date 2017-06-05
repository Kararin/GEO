let fs = require('fs'),
    path = require('path'),
    sql = require('mssql'),
    deep = require('deep-diff'),
    pool,
    socket,
    interval;

async function connect () {
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
async function requestRange (range) {
    const result = await sql.query`
        select * 
        from position 
        where time between ${range.from} and ${range.to}
        order by time
    `

    return result;
}

async function start() {
    console.log('start');

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

async function stop () {
    console.log('stopped');
    clearInterval(interval);
}

async function show (range) {
    console.log('show');
    let {recordsets: result} = await requestRange(range);

    console.log(result[0]);
    socket.emit('range', result[0]);
}

function initListeners (socket) {
    socket.on('start', start);
    socket.on('stop', stop);
    socket.on('show', show);
}

async function set(socketio) {
    socket = socketio;
    initListeners(socket);
    await connect();
}

module.exports = {
    connect,
    request,
    start,
    set
};