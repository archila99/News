export default async function handler(req, res) {
  try {
    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "Missing NEWS_API_KEY environment variable",
      });
    }

    const url =
      "https://newsapi.org/v2/top-headlines?country=us&category=entertainment";
    const response = await fetch(url, {
      headers: {
        "X-Api-Key": apiKey,
      },
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      return res.status(500).json({
        error: "Failed to fetch NewsAPI",
        status: response.status,
        details: text,
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err?.message ?? "Unknown error" });
  }
}
