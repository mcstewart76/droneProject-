const dgram = require('dgram');
const readline = require('readline');

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
        console.log(`Command Running: ${command} \n`)
    })
}

client.on('message', (message, remote) => {
    console.log(`${remote.address}:${remote.port} - ${message}`);
})

function userInput(){
    rl.question('>>> ', (command) => {
        if (command === 'exit'){
            console.log("\n \n Program exiting, Goodbye! \n \n")
            process.exit();
        }else{
            sendMessage(command)
            userInput();
        }
    });
};

userInput();