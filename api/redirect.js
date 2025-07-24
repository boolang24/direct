export default async function handler(req, res) {
  const ip = req.headers["x-forwarded-for"]?.split(",")[0] || "0.0.0.0";
  const today = new Date().toISOString().slice(0, 10);

  try {
    const response = await fetch(`${req.headers.host.startsWith("localhost") ? "http://" : "https://"}${req.headers.host}/api/log-ip`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ip, date: today }),
    });

    const result = await response.json();

    if (result.allowed) {
      return res.writeHead(302, {
        Location: "https://siblinggut.com/u5se2wg3?key=3bdba92060257b990b3bf917b9fa01e9", // link iklan
      }).end();
    } else {
      return res.writeHead(302, {
        Location: "https://verbalimpliedgorilla.com/h0fybswz?key=e5a9a54ad6d3ed789e88b81c126595ba", // ganti sesuai kontenmu
      }).end();
    }
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}
