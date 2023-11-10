import type { NextApiRequest, NextApiResponse } from 'next';

const solutionDeployApi = async (_req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  // Ensure response is text/html
  res.setHeader('Content-Type', 'text/html;charset=utf-8');

  return res.status(200).send('<b>solution-deploy</b>');
};

export default solutionDeployApi;
