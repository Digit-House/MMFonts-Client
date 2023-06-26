'use server';
export default function handler(req, res) {
  res.status(200).json({ message: 'This is a test API endpoint' });
}
