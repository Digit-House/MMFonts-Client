import { FontType } from './golobalTypes';
import Rabbit from './Rabbit';

const default_text_uni = ['ကောင်းသော နံနက်ခင်း ပါ', 'ကောင်းသော နေ့လည်ခင်းပါ', 'ကောင်းသော ညနေခင်းပါ', 'ကောင်းသော ညပါ'];
const default_text_zaw = ['ေကာင္းေသာ နံနက္ခင္း ပါ', 'ေကာင္းေသာ ေန႔လည္ခင္းပါ', 'ေကာင္းေသာ ညေနခင္းပါ', 'ေကာင္းေသာ ညပါ'];
const default_text_win = ['aumif;aom eHeufcif; yg', 'aumif;aom aeYvnfcif;yg', 'aumif;aom naecif;yg', 'aumif;aom nyg'];

function getGreeting(greeting: string[]) {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return greeting[0];
  } else if (currentHour >= 12 && currentHour < 17) {
    return greeting[1];
  } else if (currentHour >= 17 && currentHour < 21) {
    return greeting[2];
  } else {
    return greeting[3];
  }

  return greeting;
}

export const convertText = (font: FontType, text: string | undefined) => {
  if (font.fontSupportType.toLowerCase() === 'unicode') return text || getGreeting(default_text_uni);
  if (font.fontSupportType.toLowerCase() === 'zawgyi')
    return text ? Rabbit.uni2zg(text) : getGreeting(default_text_zaw);
  if (font.fontSupportType.toLowerCase() === 'win') {
    if (!text) return getGreeting(default_text_win);
    const convertTextZg = Rabbit.uni2zg(text);
    return Rabbit.zg2win(convertTextZg);
  }
};
