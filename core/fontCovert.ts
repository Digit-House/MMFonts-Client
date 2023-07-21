import { FontType } from './golobalTypes';
import Rabbit from './Rabbit';

const default_text_uni = 'ကောင်းသော နံနက်ခင်း ပါ';
const default_text_zaw = 'ေကာင္းေသာ နံနက္ခင္း ပါ';
const default_text_win = 'aumif;aom eHeufcif; yg';

export const convertText = (font: FontType, text: string | undefined) => {
  if (font.fontSupportType === 'unicode') return text || default_text_uni;
  if (font.fontSupportType === 'zawgyi') return text ? Rabbit.uni2zg(text) : default_text_zaw;
  if (font.fontSupportType === 'win') {
    if (!text) return default_text_win;
    const convertTextZg = Rabbit.uni2zg(text);
    return Rabbit.zg2win(convertTextZg);
  }
};
