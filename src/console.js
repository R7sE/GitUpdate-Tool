const colors = require('colors/safe');

class Console {

    constructor () {
        this.cache = {
            color: 'white',
            debug: true,
        };
    }

    get debug() {
        return this.cache.debug;
    }

    set debug (val) {
        this.cache.debug = (val === true);
    }

    hms () {
        return (new Date()).toTimeString().split(' ')[0];

    }
    print(message, color = 'white') {
        if (! this.debug) {
            return;
        }

        color = color || this.cache.color || 'white';
        console.info(colors[color](message));
    }
    log (message) {
        this.print(`Log     [${this.hms()}] > ${message}`, 'white');
    }
    info (message) {
        this.print(`Info    [${this.hms()}] > ${message}`, 'blue');
    }
    success(message) {
        this.print(`Ok      [${this.hms()}] > ${message}`, 'green');
    }
    error (message) {
        this.print(`Error   [${this.hms()}] > ${message}`, 'red');
    }
    warning (message) {
        this.print(`Warning [${this.hms()}] > ${message}`, 'yellow');
    }

}



module.exports = new Console();