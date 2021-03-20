const [,, ...args] = process.argv
const { exec } = require("child_process");
var vm = require("vm");
var fs = require("fs");

const exe = async (string) => {
    const coffeeProcess =  exec(string, (error, stdout, stderr) => {
        if(error) {
            console.log('error', error);
        } 
        if(stdout) {
            console.log('stdout', stdout);
        }
        if(stderr) {
            console.log('stderr', stderr);
        }
    });
    coffeeProcess.stdout.on('data', function(data) {
        console.log(data);
    });
}

const create = async (args) => {
    if(args.length < 3) {
        return throwEerror();
    }
    switch (args[1]) {
        case 'app':
            console.log(`generate app in ../${args[2]}`);
            exe(`npx create-react-app --template file:./cra-template ${args[2]}`);
            break;

        case 'pages':
            console.log(`generate pages in ../${args[2]}`);
            exe(`node ./build/pages.js ${args[2]}`);
            break;

        case 'services':
            console.log(`generate services in ../${args[2]}`);
            exe(`node ./build/services.js ${args[2]}`);
            break;

        case 'widgets':
            console.log(`generate widgets in ../${args[2]}`);
            exe(`node ./build/widgets.js ${args[2]}`);
            break;

        case 'all':
            console.log(`generate all in ../${args[2]}`);
            await exe(`json-server --watch ./jsonServer/db.json`);
            await exe(`node ./build/pages.js ${args[2]}`);
            await exe(`node ./build/services.js ${args[2]}`);
            await exe(`node ./build/widgets.js ${args[2]}`);
            break;

        default:
            throwEerror();
            break;
    }
};

const throwEerror = () => {console.log(`please run one of following commands:\n  run serve\n  gen [app|services|widgets|pages|all] appname)`)};

const run = async (args) => {
    console.log(`please wait...`);
    switch (args[1]) {
        case 'serve':
            console.log(`launch server`);
            await exe(`json-server --watch ./jsonServer/db.json`);
            break;
        default:
            throwEerror();
            break;
    }
};


if(args && args.length > 1) {
    switch (args[0]) {
        case 'gen':
            create(args);
            break;
        case 'run':
            run(args);
            break;
        default:
            throwEerror();
            break;
    }
} else {
    throwEerror();
}
