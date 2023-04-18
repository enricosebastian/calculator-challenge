import requestIp from 'request-ip'

export default async function handler(req,res) {
    const detectedIp = requestIp.getClientIp(req);
    res.status(200).json({ ipAddress: detectedIp});
}
  