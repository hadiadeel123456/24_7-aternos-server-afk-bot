const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

const botArgs = {
  host: 'playnextsmp.aternos.me', 
  port: 25565,                         
  username: 'AFK_Bot_247',
  version: 1.21.11
};

function createBot() {
  const bot = mineflayer.createBot(botArgs);
  bot.on('login', () => console.log(`[Bot] Connected to Aternos!`));
  bot.on('spawn', () => {
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000);
  });
  bot.on('end', () => setTimeout(createBot, 10000));
}
createBot();

app.get('/', (req, res) => res.send('Bot is Alive!'));
app.listen(process.env.PORT || 3000);
