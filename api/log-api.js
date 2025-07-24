let ipLog = {}; // penyimpanan sementara di memori (hilang kalau server restart)

export default function handler(req, res) {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] || req.connection.remoteAddress;
  const today = new Date().toISOString().split("T")[0];

  if (req.method === "GET") {
    const logged = ipLog[ip] === today;
    return res.status(200).json({ logged });
  }

  if (req.method === "POST") {
    ipLog[ip] = today;
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
