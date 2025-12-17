function sum(ctx) {
    const text = ctx.message.text.split(' ');
    const firstNumber = Number(text[1]);
    const secondNumber = Number(text[2]);
    ctx.reply(`Your sum is: ${firstNumber + secondNumber}`);
}

function subtr(ctx) {
    const text = ctx.message.text.split(' ');
    const firstNumber = Number(text[1]);
    const secondNumber = Number(text[2]);
    ctx.reply(`Your subtract is: ${firstNumber - secondNumber}`);
}

function mult(ctx) {
    const text = ctx.message.text.split(' ');
    const firstNumber = Number(text[1]);
    const secondNumber = Number(text[2]);
    ctx.reply(`Your mult is: ${firstNumber * secondNumber}`);
}

function div(ctx) {
    const text = ctx.message.text.split(' ');
    const firstNumber = Number(text[1]);
    const secondNumber = Number(text[2]);
    ctx.reply(`Your div is: ${firstNumber / secondNumber}`);
}

function oddOrEven(ctx) {
    const text = ctx.message.text.split(' ');
    const number = Number(text[3]);
    ctx.reply(`Your number ${number} is ${number % 2 ? 'odd' : 'even'}`);
}

module.exports = {sum, subtr, mult, div, oddOrEven };