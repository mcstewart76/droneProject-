const dgram = require('dgram')

const PORT = 8889;
const HOST = '192.168.10.1';

const client = dgram.createSocket('udp4');
client.bind(PORT);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function sendMessage(command) {
    client.send(command, 0, command.length, PORT, HOST, (err,bytes) => {
        if(err) throw err;
        console.log(`Ready to go on PORT: ${PORT}`)
    })
}

client.on('message', (message, remote) => {
    console.log(`${remote.address}:${remote.port} - ${message}`);
})

(function userInput(){
    rl.question('Enter command: ', (command) => {
        if (command === 'exit'){
            rl.close();
        }else{
            sendMessage(command)
            userInput();
        }
    });
}())