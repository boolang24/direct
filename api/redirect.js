export default async function handler(req, res) {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] || req.connection.remoteAddress;

  const today = new Date().toISOString().split("T")[0];

  const endpoint = `https://my-api-nu-three.vercel.app/api/log-ip`; // endpoint log kamu

  try {
    // cek apakah IP sudah klik hari ini
    const check = await fetch(`${endpoint}?ip=${ip}&date=${today}`);
    const data = await check.json();

    if (data.logged) {
      // Sudah klik hari ini ➜ langsung ke konten tanpa iklan
      return res.redirect(302, "https://yourcontentlink.com");
    }

    // Belum klik ➜ log IP dan redirect ke iklan
    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ip, date: today }),
    });

    return res.redirect(302, "https://siblinggut.com/u5se2wg3?key=3bdba92060257b990b3bf917b9fa01e9"); // LINK IKLAN
  } catch (err) {
    console.error("Redirect error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
