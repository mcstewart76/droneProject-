const dgram = require('dgram');
const { send } = require('process');

class Tello {
    constructor() {
        this.tello_address = '192.168.10.1';
        this.command_port = 8889;
        this.command_socket = dgram.createSocket('udp4')
        this.initCommandSocket();
    }




    initCommandSocket() {
        this.command_socket.on('message', (msg, rinfo) => {
            console.log(`Received ${msg}`)
        });
        this.command_socket.on('error', (err) => {
            if (err) {
                console.log(err)
                this.command_socket.close();
            }
        });
        this.command_socket.bind(this.command_port);
    }

    sendCommand(message) {
        var command = new Buffer(message);
        this.command_socket.send(command, this.command_port, this.tello_address, (err, bytes) => {
            if (err) {
                console.log(err)
            }
        });

    }

    startCLI() {
        this.sendCommand('command')

        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout

        });

        rl.on('line', (line) => {
            if (line === 'close') {
                rl.close();
            }

            this.sendCommand(line);

        }).on('close', () => {
            this.command_socket.close();
            process.exit(0);
        });
    }
}


const drone = new Tello();

drone.startCLI();
process.on('uncaughtException', () => {
    drone.command_socket.close();
});
