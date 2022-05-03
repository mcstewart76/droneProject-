const dgram = require('dgram');
const readline = require('readline');
// const keymage = require('keymage')



// keymage('w', function() {console.log("forward 10"); });
// keymage('q', function() {console.log("ccw 15"); });
// keymage('e', function() {console.log("cw 15"); });
// keymage('s', function() {console.log("back 10"); });
// keymage('w', function() {console.log("forward 10"); });
// keymage('w', function() {console.log("forward 10"); });


const PORT = 8889;
const HOST = '192.168.10.1';

const client = dgram.createSocket('udp4');
client.bind(PORT);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
        
        }
      );



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
        }if(command === 'chris'){
            sendMessage('takeoff');
             sleep(1000);
             sendMessage('up 20');
             sleep(1000);
             sendMessage('forward 20');
             sleep(1000);
            sendMessage('land');
        userInput();
        }else{
            sendMessage(command)
            userInput();
        }
    });
};
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
userInput();