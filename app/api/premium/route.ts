import type { NextApiRequest, NextApiResponse } from 'next';

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('HELLO <');
  const { body } = req;
  console.log('POST request received with body:', body);
};
