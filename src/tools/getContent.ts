import * as config from './config.js';
import * as fs from 'fs';

  const news = fs.readdirSync('./news');

  const length = news.length;
  console.log(length);
  
  for (let i = 0; i < length; i++ ) {
    const fileNum = i;
    const fileName = news[fileNum];
    if (fileName.includes("json")) {
        const message = require(`../news/${fileName}`);
        const content = message.content + ' \n';

        if (content.includes('followers')) {
          // if (content.includes("新蛤社")) {

          console.log(fileName + ' ' + content);
          //   console.log(content.replace(/pic.twitter.com/g, ' https://pic.twitter.com'));
          // fs.unlinkSync(`./news/${fileName}`);
        }
    };
  }
  