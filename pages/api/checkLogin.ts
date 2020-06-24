import { NextApiRequest, NextApiResponse } from 'next';
import { selectSessionByToken } from '../../db';

export default async function checkLogin(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const token = req.cookies.token;
  const session = await selectSessionByToken(token);
  res.json(session.length > 0);
}
