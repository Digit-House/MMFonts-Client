import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const param = req.query;
  console.log(param, 'param');
  const fontDir = path.join(process.cwd(), 'public', 'fonts', param.name);

  fs.readdir(fontDir, (err, files) => {
    console.log('darae');
    if (err) {
      res.status(500).json({ error: 'Failed to read font directory' });
      return;
    }

    const fontFiles = files.map((file) => ({
      name: file,
      url: `/fonts/${file}`,
    }));

    res.status(200).json(fontFiles);
  });
}
