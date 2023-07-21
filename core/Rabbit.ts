/* eslint-disable max-lines */
/* eslint-disable no-param-reassign */
const Rabbit = {
  zg2uni: zg2uni,
  uni2zg: uni2zg,
  zg2win: zg2win,
};

function uni2zg(output: string) {
  const rule = [
    {
      from: '\u1004\u103a\u1039',
      to: '\u1064',
    },
    {
      from: '\u1039\u1010\u103d',
      to: '\u1096',
    },
    {
      from: '\u102b\u103a',
      to: '\u105a',
    },
    {
      from: '\u102d\u1036',
      to: '\u108e',
    },
    {
      from: '\u104e\u1004\u103a\u1038',
      to: '\u104e',
    },
    {
      from: '[\u1025\u1009](?=\u1039)',
      to: '\u106a',
    },
    {
      from: '\u1009(?=[\u102f\u1030])',
      to: '\u1025',
    },
    {
      from: '[\u1025\u1009](?=[\u1037]?[\u103a])',
      to: '\u1025',
    },
    {
      from: '\u100a(?=[\u1039\u103d])',
      to: '\u106b',
    },
    {
      from: '(\u1039[\u1000-\u1021])(\u102D){0,1}\u102f',
      to: '$1$2\u1033',
    },
    {
      from: '(\u1039[\u1000-\u1021])\u1030',
      to: '$1\u1034',
    },
    {
      from: '\u1014(?=[\u102d\u102e\u102f\u103A]?[\u1030\u103d\u103e\u102f\u1039])',
      to: '\u108f',
    },
    {
      from: '\u1014(?=\u103A\u102F )',
      to: '\u108f',
    },
    {
      from: '\u1014\u103c',
      to: '\u108f\u103c',
    },
    {
      from: '\u1039\u1000',
      to: '\u1060',
    },
    {
      from: '\u1039\u1001',
      to: '\u1061',
    },
    {
      from: '\u1039\u1002',
      to: '\u1062',
    },
    {
      from: '\u1039\u1003',
      to: '\u1063',
    },
    {
      from: '\u1039\u1005',
      to: '\u1065',
    },
    {
      from: '\u1039\u1006',
      to: '\u1066',
    },
    {
      from: '\u1039\u1007',
      to: '\u1068',
    },
    {
      from: '\u1039\u1008',
      to: '\u1069',
    },
    {
      from: '\u1039\u100b',
      to: '\u106c',
    },
    {
      from: '\u100b\u1039\u100c',
      to: '\u1092',
    },
    {
      from: '\u1039\u100c',
      to: '\u106d',
    },
    {
      from: '\u100d\u1039\u100d',
      to: '\u106e',
    },
    {
      from: '\u100d\u1039\u100e',
      to: '\u106f',
    },
    {
      from: '\u1039\u100f',
      to: '\u1070',
    },
    {
      from: '\u1039\u1010',
      to: '\u1071',
    },
    {
      from: '\u1039\u1011',
      to: '\u1073',
    },
    {
      from: '\u1039\u1012',
      to: '\u1075',
    },
    {
      from: '\u1039\u1013',
      to: '\u1076',
    },
    {
      from: '\u1039[\u1014\u108f]',
      to: '\u1077',
    },
    {
      from: '\u1039\u1015',
      to: '\u1078',
    },
    {
      from: '\u1039\u1016',
      to: '\u1079',
    },
    {
      from: '\u1039\u1017',
      to: '\u107a',
    },
    {
      from: '\u1039\u1018',
      to: '\u107b',
    },
    {
      from: '\u1039\u1019',
      to: '\u107c',
    },
    {
      from: '\u1039\u101c',
      to: '\u1085',
    },
    {
      from: '\u103f',
      to: '\u1086',
    },
    {
      from: '\u103d\u103e',
      to: '\u108a',
    },
    {
      from: '(\u1064)([\u1000-\u1021])([\u103b\u103c]?)\u102d',
      to: '$2$3\u108b',
    },
    {
      from: '(\u1064)([\u1000-\u1021])([\u103b\u103c]?)\u102e',
      to: '$2$3\u108c',
    },
    {
      from: '(\u1064)([\u1000-\u1021])([\u103b\u103c]?)\u1036',
      to: '$2$3\u108d',
    },
    {
      from: '(\u1064)([\u1000-\u1021\u1040-\u1049])([\u103b\u103c]?)([\u1031]?)',
      to: '$2$3$4$1',
    },
    {
      from: '\u101b(?=([\u102d\u102e]?)[\u102f\u1030\u103d\u108a])',
      to: '\u1090',
    },
    {
      from: '\u100f\u1039\u100d',
      to: '\u1091',
    },
    {
      from: '\u100b\u1039\u100b',
      to: '\u1097',
    },
    {
      from: '([\u1000-\u1021\u108f\u1029\u106a\u106e\u106f\u1086\u1090\u1091\u1092\u1097\u1096])([\u1060-\u1069\u106c\u106d\u1070-\u107c\u1085\u108a])?([\u103b-\u103e]*)?\u1031',
      to: '\u1031$1$2$3',
    },
    {
      from: '\u103c\u103e',
      to: '\u103c\u1087',
    },
    {
      from: '([\u1000-\u1021\u108f\u1029])([\u1060-\u1069\u106c\u106d\u1070-\u107c\u1085])?(\u103c)',
      to: '$3$1$2',
    },
    {
      from: '\u103a',
      to: '\u1039',
    },
    {
      from: '\u103b',
      to: '\u103a',
    },
    {
      from: '\u103c',
      to: '\u103b',
    },
    {
      from: '\u103d',
      to: '\u103c',
    },
    {
      from: '\u103e',
      to: '\u103d',
    },
    {
      from: '([^\u103a\u100a])\u103d([\u102d\u102e]?)\u102f',
      to: '$1\u1088$2',
    },
    {
      from: '([\u101b\u103a\u103c\u108a\u1088\u1090])([\u1030\u103d])?([\u1032\u1036\u1039\u102d\u102e\u108b\u108c\u108d\u108e]?)(\u102f)?\u1037',
      to: '$1$2$3$4\u1095',
    },
    {
      from: '([\u102f\u1014\u1030\u103d])([\u1032\u1036\u1039\u102d\u102e\u108b\u108c\u108d\u108e]?)\u1037',
      to: '$1$2\u1094',
    },
    {
      from: '([\u103b])([\u1000-\u1021])([\u1087]?)([\u1036\u102d\u102e\u108b\u108c\u108d\u108e]?)\u102f',
      to: '$1$2$3$4\u1033',
    },
    {
      from: '([\u103b])([\u1000-\u1021])([\u1087]?)([\u1036\u102d\u102e\u108b\u108c\u108d\u108e]?)\u1030',
      to: '$1$2$3$4\u1034',
    },
    {
      from: '([\u103a\u103c\u100a\u1008\u100b\u100c\u100d\u1020\u1025])([\u103d]?)([\u1036\u102d\u102e\u108b\u108c\u108d\u108e]?)\u102f',
      to: '$1$2$3\u1033',
    },
    {
      from: '([\u103a\u103c\u100a\u1008\u100b\u100c\u100d\u1020\u1025])(\u103d?)([\u1036\u102d\u102e\u108b\u108c\u108d\u108e]?)\u1030',
      to: '$1$2$3\u1034',
    },
    {
      from: '([\u100a\u1020\u1009])\u103d',
      to: '$1\u1087',
    },
    {
      from: '\u103d\u1030',
      to: '\u1089',
    },
    {
      from: '\u103b([\u1000\u1003\u1006\u100f\u1010\u1011\u1018\u101a\u101c\u101a\u101e\u101f])',
      to: '\u107e$1',
    },
    {
      from: '\u107e([\u1000\u1003\u1006\u100f\u1010\u1011\u1018\u101a\u101c\u101a\u101e\u101f])([\u103c\u108a])([\u1032\u1036\u102d\u102e\u108b\u108c\u108d\u108e])',
      to: '\u1084$1$2$3',
    },
    {
      from: '\u107e([\u1000\u1003\u1006\u100f\u1010\u1011\u1018\u101a\u101c\u101a\u101e\u101f])([\u103c\u108a])',
      to: '\u1082$1$2',
    },
    {
      from: '\u107e([\u1000\u1003\u1006\u100f\u1010\u1011\u1018\u101a\u101c\u101a\u101e\u101f])([\u1033\u1034]?)([\u1032\u1036\u102d\u102e\u108b\u108c\u108d\u108e])',
      to: '\u1080$1$2$3',
    },
    {
      from: '\u103b([\u1000-\u1021])([\u103c\u108a])([\u1032\u1036\u102d\u102e\u108b\u108c\u108d\u108e])',
      to: '\u1083$1$2$3',
    },
    {
      from: '\u103b([\u1000-\u1021])([\u103c\u108a])',
      to: '\u1081$1$2',
    },
    {
      from: '\u103b([\u1000-\u1021])([\u1033\u1034]?)([\u1032\u1036\u102d\u102e\u108b\u108c\u108d\u108e])',
      to: '\u107f$1$2$3',
    },
    {
      from: '\u103a\u103d',
      to: '\u103d\u103a',
    },
    {
      from: '\u103a([\u103c\u108a])',
      to: '$1\u107d',
    },
    {
      from: '([\u1033\u1034])(\u1036?)\u1094',
      to: '$1$2\u1095',
    },
    {
      from: '\u108F\u1071',
      to: '\u108F\u1072',
    },
    {
      from: '\u108F\u1073',
      to: '\u108F\u1074',
    },
    {
      from: '([\u1000-\u1021])([\u107B\u1066])\u102C',
      to: '$1\u102C$2',
    },
    {
      from: '\u102C([\u107B\u1066])\u1037',
      to: '\u102C$1\u1094',
    },
    {
      from: '\u1047((?=[\u1000-\u1021]\u1039)|(?=[\u102c-\u1030\u1032\u1036-\u1038\u103c\u103d]))',
      to: '\u101b',
    },
  ];
  return replace_with_rule(rule, output);
}

function zg2uni(output: string) {
  const rule = [
    {
      from: '([\u102D\u102E\u103D\u102F\u1037\u1095])\\1+',
      to: '$1',
    },
    {
      from: '\u200B',
      to: '',
    },
    {
      from: '\u103d\u103c',
      to: '\u108a',
    },
    {
      from: '(\u103d|\u1087)',
      to: '\u103e',
    },
    {
      from: '\u103c',
      to: '\u103d',
    },
    {
      from: '(\u103b|\u107e|\u107f|\u1080|\u1081|\u1082|\u1083|\u1084)',
      to: '\u103c',
    },
    {
      from: '(\u103a|\u107d)',
      to: '\u103b',
    },
    {
      from: '\u1039',
      to: '\u103a',
    },
    {
      from: '(\u1066|\u1067)',
      to: '\u1039\u1006',
    },
    {
      from: '\u106a',
      to: '\u1009',
    },
    {
      from: '\u106b',
      to: '\u100a',
    },
    {
      from: '\u106c',
      to: '\u1039\u100b',
    },
    {
      from: '\u106d',
      to: '\u1039\u100c',
    },
    {
      from: '\u106e',
      to: '\u100d\u1039\u100d',
    },
    {
      from: '\u106f',
      to: '\u100d\u1039\u100e',
    },
    {
      from: '\u1070',
      to: '\u1039\u100f',
    },
    {
      from: '(\u1071|\u1072)',
      to: '\u1039\u1010',
    },
    {
      from: '\u1060',
      to: '\u1039\u1000',
    },
    {
      from: '\u1061',
      to: '\u1039\u1001',
    },
    {
      from: '\u1062',
      to: '\u1039\u1002',
    },
    {
      from: '\u1063',
      to: '\u1039\u1003',
    },
    {
      from: '\u1065',
      to: '\u1039\u1005',
    },
    {
      from: '\u1068',
      to: '\u1039\u1007',
    },
    {
      from: '\u1069',
      to: '\u1039\u1008',
    },
    {
      from: '(\u1073|\u1074)',
      to: '\u1039\u1011',
    },
    {
      from: '\u1075',
      to: '\u1039\u1012',
    },
    {
      from: '\u1076',
      to: '\u1039\u1013',
    },
    {
      from: '\u1077',
      to: '\u1039\u1014',
    },
    {
      from: '\u1078',
      to: '\u1039\u1015',
    },
    {
      from: '\u1079',
      to: '\u1039\u1016',
    },
    {
      from: '\u107a',
      to: '\u1039\u1017',
    },
    {
      from: '\u107c',
      to: '\u1039\u1019',
    },
    {
      from: '\u1085',
      to: '\u1039\u101c',
    },
    {
      from: '\u1033',
      to: '\u102f',
    },
    {
      from: '\u1034',
      to: '\u1030',
    },
    {
      from: '\u103f',
      to: '\u1030',
    },
    {
      from: '\u1086',
      to: '\u103f',
    },
    {
      from: '\u1036\u1088',
      to: '\u1088\u1036',
    },
    {
      from: '\u1088',
      to: '\u103e\u102f',
    },
    {
      from: '\u1089',
      to: '\u103e\u1030',
    },
    {
      from: '\u108a',
      to: '\u103d\u103e',
    },
    {
      from: '\u103B\u1064',
      to: '\u1064\u103B',
    },
    {
      from: '\u103c([\u1000-\u1021])([\u1064\u108b\u108d])',
      to: '$1\u103c$2',
    },
    {
      from: '(\u1031)?([\u1000-\u1021\u1040-\u1049])(\u103c)?\u1064',
      to: '\u1004\u103a\u1039$1$2$3',
    },
    {
      from: '(\u1031)?([\u1000-\u1021])(\u103b|\u103c)?\u108b',
      to: '\u1004\u103a\u1039$1$2$3\u102d',
    },
    {
      from: '(\u1031)?([\u1000-\u1021])(\u103b)?\u108c',
      to: '\u1004\u103a\u1039$1$2$3\u102e',
    },
    {
      from: '(\u1031)?([\u1000-\u1021])([\u103b\u103c])?\u108d',
      to: '\u1004\u103a\u1039$1$2$3\u1036',
    },
    {
      from: '\u108e',
      to: '\u102d\u1036',
    },
    {
      from: '\u108f',
      to: '\u1014',
    },
    {
      from: '\u1090',
      to: '\u101b',
    },
    {
      from: '\u1091',
      to: '\u100f\u1039\u100d',
    },
    {
      from: '\u1092',
      to: '\u100b\u1039\u100c',
    },
    {
      from: '\u1019\u102c(\u107b|\u1093)',
      to: '\u1019\u1039\u1018\u102c',
    },
    {
      from: '(\u107b|\u1093)',
      to: '\u1039\u1018',
    },
    {
      from: '(\u1094|\u1095)',
      to: '\u1037',
    },
    {
      from: '([\u1000-\u1021])\u1037\u1032',
      to: '$1\u1032\u1037',
    },
    {
      from: '\u1096',
      to: '\u1039\u1010\u103d',
    },
    {
      from: '\u1097',
      to: '\u100b\u1039\u100b',
    },
    {
      from: '\u103c([\u1000-\u1021])([\u1000-\u1021])?',
      to: '$1\u103c$2',
    },
    {
      from: '([\u1000-\u1021])\u103c\u103a',
      to: '\u103c$1\u103a',
    },
    {
      from: '\u1047(?=[\u102c-\u1030\u1032\u1036-\u1038\u103d\u1038])',
      to: '\u101b',
    },
    {
      from: '\u1031\u1047',
      to: '\u1031\u101b',
    },
    {
      from: '\u1040(\u102e|\u102f|\u102d\u102f|\u1030|\u1036|\u103d|\u103e)',
      to: '\u101d$1',
    },
    {
      from: '([^\u1040\u1041\u1042\u1043\u1044\u1045\u1046\u1047\u1048\u1049])\u1040\u102b',
      to: '$1\u101d\u102b',
    },
    {
      from: '([\u1040\u1041\u1042\u1043\u1044\u1045\u1046\u1047\u1048\u1049])\u1040\u102b(?!\u1038)',
      to: '$1\u101d\u102b',
    },
    {
      from: '^\u1040(?=\u102b)',
      to: '\u101d',
    },
    {
      from: '\u1040\u102d(?!\u0020?/)',
      to: '\u101d\u102d',
    },
    {
      from: '([^\u1040-\u1049])\u1040([^\u1040-\u1049\u0020]|[\u104a\u104b])',
      to: '$1\u101d$2',
    },
    {
      from: '([^\u1040-\u1049])\u1040(?=[\\f\\n\\r])',
      to: '$1\u101d',
    },
    {
      from: '([^\u1040-\u1049])\u1040$',
      to: '$1\u101d',
    },
    {
      from: '\u1031([\u1000-\u1021\u103f])(\u103e)?(\u103b)?',
      to: '$1$2$3\u1031',
    },
    {
      from: '([\u1000-\u1021])\u1031([\u103b\u103c\u103d\u103e]+)',
      to: '$1$2\u1031',
    },
    {
      from: '\u1032\u103d',
      to: '\u103d\u1032',
    },
    {
      from: '([\u102d\u102e])\u103b',
      to: '\u103b$1',
    },
    {
      from: '\u103d\u103b',
      to: '\u103b\u103d',
    },
    {
      from: '\u103a\u1037',
      to: '\u1037\u103a',
    },
    {
      from: '\u102f(\u102d|\u102e|\u1036|\u1037)\u102f',
      to: '\u102f$1',
    },
    {
      from: '(\u102f|\u1030)(\u102d|\u102e)',
      to: '$2$1',
    },
    {
      from: '(\u103e)(\u103b|\u103c)',
      to: '$2$1',
    },
    {
      from: '\u1025(?=[\u1037]?[\u103a\u102c])',
      to: '\u1009',
    },
    {
      from: '\u1025\u102e',
      to: '\u1026',
    },
    {
      from: '\u1005\u103b',
      to: '\u1008',
    },
    {
      from: '\u1036(\u102f|\u1030)',
      to: '$1\u1036',
    },
    {
      from: '\u1031\u1037\u103e',
      to: '\u103e\u1031\u1037',
    },
    {
      from: '\u1031\u103e\u102c',
      to: '\u103e\u1031\u102c',
    },
    {
      from: '\u105a',
      to: '\u102b\u103a',
    },
    {
      from: '\u1031\u103b\u103e',
      to: '\u103b\u103e\u1031',
    },
    {
      from: '(\u102d|\u102e)(\u103d|\u103e)',
      to: '$2$1',
    },
    {
      from: '\u102c\u1039([\u1000-\u1021])',
      to: '\u1039$1\u102c',
    },
    {
      from: '\u1039\u103c\u103a\u1039([\u1000-\u1021])',
      to: '\u103a\u1039$1\u103c',
    },
    {
      from: '\u103c\u1039([\u1000-\u1021])',
      to: '\u1039$1\u103c',
    },
    {
      from: '\u1036\u1039([\u1000-\u1021])',
      to: '\u1039$1\u1036',
    },
    {
      from: '\u104e',
      to: '\u104e\u1004\u103a\u1038',
    },
    {
      from: '\u1040(\u102b|\u102c|\u1036)',
      to: '\u101d$1',
    },
    {
      from: '\u1025\u1039',
      to: '\u1009\u1039',
    },
    {
      from: '([\u1000-\u1021])\u103c\u1031\u103d',
      to: '$1\u103c\u103d\u1031',
    },
    {
      from: '([\u1000-\u1021])\u103b\u1031\u103d(\u103e)?',
      to: '$1\u103b\u103d$2\u1031',
    },
    {
      from: '([\u1000-\u1021])\u103d\u1031\u103b',
      to: '$1\u103b\u103d\u1031',
    },
    {
      from: '([\u1000-\u1021])\u1031(\u1039[\u1000-\u1021]\u103d?)',
      to: '$1$2\u1031',
    },
    {
      from: '\u1038\u103a',
      to: '\u103a\u1038',
    },
    {
      from: '\u102d\u103a|\u103a\u102d',
      to: '\u102d',
    },
    {
      from: '\u102d\u102f\u103a',
      to: '\u102d\u102f',
    },
    {
      from: '\u0020\u1037',
      to: '\u1037',
    },
    {
      from: '\u1037\u1036',
      to: '\u1036\u1037',
    },
    {
      from: '[\u102d]+',
      to: '\u102d',
    },
    {
      from: '[\u103a]+',
      to: '\u103a',
    },
    {
      from: '[\u103d]+',
      to: '\u103d',
    },
    {
      from: '[\u1037]+',
      to: '\u1037',
    },
    {
      from: '[\u102e]+',
      to: '\u102e',
    },
    {
      from: '\u102d\u102e|\u102e\u102d',
      to: '\u102e',
    },
    {
      from: '\u102f\u102d',
      to: '\u102d\u102f',
    },
    {
      from: '\u1037\u1037',
      to: '\u1037',
    },
    {
      from: '\u1032\u1032',
      to: '\u1032',
    },
    {
      from: '\u1044\u1004\u103a\u1038',
      to: '\u104E\u1004\u103a\u1038',
    },
    {
      from: '([\u102d\u102e])\u1039([\u1000-\u1021])',
      to: '\u1039$2$1',
    },
    {
      from: '(\u103c\u1031)\u1039([\u1000-\u1021])',
      to: '\u1039$2$1',
    },
    {
      from: '\u1036\u103d',
      to: '\u103d\u1036',
    },
    {
      from: '\u1047((?=[\u1000-\u1021]\u103a)|(?=[\u102c-\u1030\u1032\u1036-\u1038\u103d\u103e]))',
      to: '\u101b',
    },
  ];
  return replace_with_rule(rule, output);
}

function replace_with_rule(rule: { from: string | number; to: string | number }[], output: string) {
  const max_loop = rule.length;
  for (let i = 0; i < max_loop; i++) {
    const data = rule[i];
    let from = data['from'];
    let to = data['to'];

    if (typeof from === 'number') {
      from = String.fromCharCode(from);
    }

    if (typeof to === 'number') {
      to = String.fromCharCode(to);
    }
    const from_regex = new RegExp(from, 'g');
    output = output.replace(from_regex, to);
  }

  return output;
}

function zg2win(output: string) {
  const rule = [
    { from: 4096, to: 117 },
    { from: 4097, to: 99 },
    { from: 4098, to: 42 },
    { from: 4099, to: 67 },
    { from: 4100, to: 105 },
    { from: 4101, to: 112 },
    { from: 4102, to: 113 },
    { from: 4103, to: 90 },
    { from: 4104, to: 245 },
    { from: 4105, to: 218 },
    { from: 4106, to: 110 },
    { from: 4107, to: 35 },
    { from: 4108, to: 88 },
    { from: 4109, to: 33 },
    { from: 4110, to: 161 },
    { from: 4111, to: 80 },
    { from: 4112, to: 119 },
    { from: 4113, to: 120 },
    { from: 4114, to: 39 },
    { from: 4115, to: 34 },
    { from: 4116, to: 101 },
    { from: 4117, to: 121 },
    { from: 4118, to: 122 },
    { from: 4119, to: 65 },
    { from: 4120, to: 98 },
    { from: 4121, to: 114 },
    { from: 4122, to: 44 },
    { from: 4123, to: 38 },
    { from: 4124, to: 118 },
    { from: 4125, to: 234 },
    { from: 4126, to: 111 },
    { from: 4127, to: 91 },
    { from: 4128, to: 86 },
    { from: 4129, to: 116 },
    { from: 4131, to: 163 },
    { from: 4132, to: 254 },
    { from: 4133, to: 79 },
    { from: 4134, to: 232 },
    { from: 4137, to: 235 },
    { from: 4138, to: 236 },
    { from: 4139, to: 103 },
    { from: 4140, to: 109 },
    { from: 4141, to: 100 },
    { from: 4142, to: 68 },
    { from: 4143, to: 107 },
    { from: 4144, to: 108 },
    { from: 4145, to: 97 },
    { from: 4146, to: 74 },
    { from: 4147, to: 75 },
    { from: 4148, to: 76 },
    { from: 4150, to: 72 },
    { from: 4151, to: 104 },
    { from: 4152, to: 59 },
    { from: 4153, to: 102 },
    { from: 4154, to: 115 },
    { from: 4155, to: 106 },
    { from: 4156, to: 71 },
    { from: 4157, to: 83 },
    { from: 4160, to: 48 },
    { from: 4161, to: 49 },
    { from: 4162, to: 50 },
    { from: 4163, to: 51 },
    { from: 4164, to: 52 },
    { from: 4165, to: 53 },
    { from: 4166, to: 54 },
    { from: 4167, to: 55 },
    { from: 4168, to: 56 },
    { from: 4169, to: 57 },
    { from: 4170, to: 63 },
    { from: 4171, to: 47 },
    { from: 4172, to: 252 },
    { from: 4173, to: 237 },
    { from: 4174, to: 164 },
    { from: 4175, to: 92 },
    { from: 4186, to: 58 },
    { from: 4192, to: 250 },
    { from: 4193, to: 169 },
    { from: 4194, to: 190 },
    { from: 4195, to: 162 },
    { from: 4196, to: 70 },
    { from: 4197, to: 246 },
    { from: 4198, to: 228 },
    { from: 4199, to: 249 },
    { from: 4200, to: 198 },
    { from: 4201, to: 209 },
    { from: 4202, to: 251 },
    { from: 4203, to: 241 },
    { from: 4204, to: 179 },
    { from: 4205, to: 178 },
    { from: 4206, to: 215 },
    { from: 4207, to: 185 },
    { from: 4208, to: 214 },
    { from: 4209, to: 229 },
    { from: 4210, to: 197 },
    { from: 4211, to: 172 },
    { from: 4212, to: 166 },
    { from: 4213, to: 180 },
    { from: 4214, to: 168 },
    { from: 4215, to: 233 },
    { from: 4216, to: 220 },
    { from: 4217, to: 230 },
    { from: 4218, to: 193 },
    { from: 4219, to: 199 },
    { from: 4220, to: 174 },
    { from: 4221, to: 223 },
    { from: 4222, to: 77 },
    { from: 4223, to: 78 },
    { from: 4224, to: 66 },
    { from: 4225, to: 96 },
    { from: 4226, to: 126 },
    { from: 4227, to: 238 },
    { from: 4228, to: 239 },
    { from: 4229, to: 244 },
    { from: 4230, to: 243 },
    { from: 4231, to: 167 },
    { from: 4232, to: 73 },
    { from: 4233, to: 170 },
    { from: 4234, to: 84 },
    { from: 4235, to: 216 },
    { from: 4236, to: 208 },
    { from: 4237, to: 248 },
    { from: 4238, to: 240 },
    { from: 4239, to: 69 },
    { from: 4240, to: 189 },
    { from: 4241, to: 64 },
    { from: 4242, to: 124 },
    { from: 4135, to: 123 }, // Note: There are duplicate cases 4135 and 4221 in the original code.
    { from: 4243, to: 123 },
    { from: 4244, to: 89 },
    { from: 4245, to: 85 },
    { from: 4246, to: 201 },
    { from: 4247, to: 165 },
    { from: 4154, to: 81 }, // Note: There are duplicate cases 4154 and 4221 in the original code.
    { from: 4221, to: 82 },
    { from: 4221, to: 87 },
  ];
  return replace_with_rule(rule, output);
}

export default Rabbit;
