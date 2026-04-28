export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET");
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "Missing NEWS_API_KEY environment variable",
      });
    }

    const url = new URL("https://newsapi.org/v2/top-headlines");
    url.searchParams.set("country", "us");
    url.searchParams.set("category", "entertainment");
    url.searchParams.set("apiKey", apiKey);

    const response = await fetch(url.toString());

    if (!response.ok) {
      let details;
      try {
        details = await response.json();
      } catch {
        details = await response.text().catch(() => "");
      }

      return res.status(response.status).json({
        error: "NewsAPI request failed",
        status: response.status,
        details,
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err?.message ?? "Unknown error" });
  }
}
