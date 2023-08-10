import fs from 'fs';
import path from 'path';

export default function handler(req: any, res: any) {
  const param = req.query;
  const fontDir = path.join(process.cwd(), 'public', 'data/fonts', param.name);

  fs.readdir(fontDir, (err, files) => {
    if (err) {
      res.status(500).json({ error: 'Failed to read font directory' });
      return;
    }

    const fontFiles = files.map((file) => ({
      name: file,
      url: `/data/fonts/${param.name}/${file}`,
      // https://raw.githubusercontent.com/Digit-House/MMfonts/develop/public/data/fonts/data/font.json
    }));
    res.status(200).json(fontFiles);
  });
}
