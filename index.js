
const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

const botArgs = {
  host: 'playnextsmp.aternos.me',
  port: 25565,                         
  username: 'AFK_Bot_247',
  version: '1.20.4'                    /
};

function createBot() {
  const bot = mineflayer.createBot(botArgs);
  
  bot.on('login', () => {
    console.log(`[Bot] Connected successfully to Aternos on version ${botArgs.version}!`);
  });

  bot.on('spawn', () => {
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000);
  });

  bot.on('end', () => {
    console.log('[Bot] Disconnected. Reconnecting in 10 seconds...');
    setTimeout(createBot, 10000);
  });
  
  bot.on('error', (err) => console.log(`[Bot Error]: ${err.message}`));
}
createBot();

app.get('/', (req, res) => res.send('Bot is Alive!'));
app.listen(process.env.PORT || 3000);
