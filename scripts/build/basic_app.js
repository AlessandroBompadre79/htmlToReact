const [,, ...args] = process.argv
const { exec } = require("child_process");


const exe = (string) => {
    const coffeeProcess =  exec(string, (error, stdout, stderr) => {
        const teaProcess = exec(`node ./build ${args}`, (error, stdout, stderr) => {});
        teaProcess.stdout.on('data', function(data) {
            console.log(data);
        });
    });
    coffeeProcess.stdout.on('data', function(data) {
        console.log(data);
    });
}

const create = (args) => {
    console.log(`please wait...`);
    exe(`npx create-react-app --template file:./cra-template ../${args}`);
};

if(args) {
    create(args);
}
