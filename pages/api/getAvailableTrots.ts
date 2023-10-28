// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prismadb'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
)=> {
  const trots= await prisma.trot.findMany({where:{status:'free'}})
  console.log(trots)
  res.status(200).json(trots)
}
export default handler