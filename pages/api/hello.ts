// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prismadb'
type Data = {
  name: string
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
)=> {
  await prisma.trot.create(
    {data:{
    code:"W086",
    lat:45.746383,
    long:21.21443,
    status:"free"}})
  console.log("test")
  res.status(200).json({ name: 'John Doe' })
}
export default handler