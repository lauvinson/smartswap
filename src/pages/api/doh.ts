import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  const target_url = 'https://cloudflare-dns.com/dns-query'

  switch (method) {
    case 'GET':
    case 'POST':
      try {
        const response = await axios({
          method: req.method,
          url: target_url,
          headers: req.headers,
          data: req.body,
          params: req.query,
        })

        res.status(response.status).json(response.data)
      } catch (error) {
        res.status(500).json({ error: error })
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
