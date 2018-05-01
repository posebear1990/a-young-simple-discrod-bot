// @ts-ignore

import * as Discord from 'discord.js';
import * as config from './config.js';
import * as fs from 'fs';

function getMessage() {
  const news = fs.readdirSync('./news');
  
  const fileNum = Math.round(Math.random() * news.length);
  const fileName = news[fileNum];
  
  if (!fileName.includes('json')){
    return '无可奉告！'
  }
  const message = require(`../news/${fileName}`);
  
  const content = message.content + " \n";
  let img = "";
  if(message.img) {
    img = message.img instanceof Array ? '\n' + message.img.join('\n') : message.img;
  }
  
  const sendMessage = content + img;
  
  return sendMessage;
}


const client = new Discord.Client();
client
  .on('ready', () => {
    console.log('Ready! Logged!!');

    const channelId = client.channels
      .filter(c => c.type === 'text')
      .map(({ id }) => {
        return id;
      })[0];
    // @ts-ignore 
    client.channels.get(channelId).send(config.loginMessage);
  })
  .on('guildCreate', guild => {
    const channelId = guild.channels
      .filter(c => c.type === 'text')
      .map(({ id }) => {
        return id;
      })[0];
    // @ts-ignore
    guild.client.channels.get(channelId).send(config.loginMessage);
  });

client.on('message', message => {
  if (message.author.bot || !message.content.includes('长者')) {
    return;
  };

  if (message.content.includes('+1s')) {
    const sendMessage = getMessage();

    message.channel.send(sendMessage);
  }else {
    message.channel.send('无可奉告.');
  }
});

client.login(config.token);
