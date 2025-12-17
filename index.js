const { Telegraf } = require('telegraf')
const { message } = require('telegraf/filters')
const { sum, subtr, div, mult, oddOrEven } = require('./handlers');

const bot = new Telegraf('8591254275:AAGzLxzSB8u4pxy024wXU3NpMYbz-T9cIfM')

const database = {};

bot.command('profile', (ctx) => {
    const user = ctx.update.message.from;
    const id = user.id; 
    if (database[id]) {
        const name = database[id].name || (user.first_name + ' ' + user.last_name);
        ctx.reply(`Your name is ${name}\nAge: ${database[id].age}\nCity: ${database[id].city}`);
    } else {
        ctx.reply('No profile information found. Please provide your details using /name command.');
    }   
});

bot.start((ctx) => ctx.reply('Welcome to PASV'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on(message('sticker'), (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.hears('What is your name', (ctx) => ctx.reply('My name is Your Bot'))
bot.launch().then(() => console.log('Bot launched'))
bot.on(message('text'), (ctx, next) => {
    if (ctx.message.text.startsWith('sum')) sum(ctx);
    else if (ctx.message.text.startsWith('mult')) mult(ctx);
    else if (ctx.message.text.startsWith('div')) div(ctx);
    else if (ctx.message.text.startsWith('odd')) oddOrEven(ctx);
    else if (ctx.message.text.startsWith('subtr')) subtr(ctx);
    else if (ctx.message.text.startsWith('/name')) {
        const user = ctx.update.message.from;
        const id = user.id;
        if (database[id]) {
            const name = user.first_name + ' ' + user.last_name;
            ctx.reply(`Your name is ${name}\nAge: ${database[id].age}\nCity: ${database[id].city}`);
        } else {
            const userName = ctx.message.text.split(' ')[1];
            database[id] = {};
            if (userName) database[id].name = userName + ' ' + user.last_name;
            ctx.reply('How old are you?');
           // Proceed to next middleware to ask for age
           return next();
           
        }
    } else if (database[ctx.update.message.from.id] && !database[ctx.update.message.from.id].age) {
        const id = ctx.update.message.from.id;
        const age = parseInt(ctx.message.text); 
        database[id].age = age;
        ctx.reply(`Where do you live?`);   
        return next(); 

    } else if (database[ctx.update.message.from.id] && !database[ctx.update.message.from.id].city) {
        const id = ctx.update.message.from.id;
        const city = ctx.message.text; 
        database[id].city = city;
        ctx.reply(`Thank you for the information!`);    

    };
});


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))