let ipLog = {}; // RAM only

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { ip, date } = req.body;

  if (!ip || !date) {
    return res.status(400).json({ error: "IP and date required" });
  }

  if (!ipLog[ip] || ipLog[ip] !== date) {
    ipLog[ip] = date;
    return res.status(200).json({ allowed: true });
  } else {
    return res.status(200).json({ allowed: false });
  }
}
