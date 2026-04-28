export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET");
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const accessKey = process.env.MEDIASTACK_ACCESS_KEY;
    if (!accessKey) {
      return res.status(500).json({
        error: "Missing MEDIASTACK_ACCESS_KEY environment variable",
      });
    }

    const url = new URL("https://api.mediastack.com/v1/news");
    url.searchParams.set("access_key", accessKey);
    url.searchParams.set("countries", "us");
    url.searchParams.set("categories", "entertainment");
    url.searchParams.set("languages", "en");
    url.searchParams.set("limit", "30");

    const response = await fetch(url.toString(), { headers: { Accept: "application/json" } });

    if (!response.ok) {
      let details;
      try {
        details = await response.json();
      } catch {
        details = await response.text().catch(() => "");
      }

      return res.status(response.status).json({
        error: "Mediastack request failed",
        status: response.status,
        details,
      });
    }

    const data = await response.json();

    if (data?.error) {
      // Mediastack often returns 200 with an error payload
      return res.status(401).json({
        error: "Mediastack authentication error",
        details: data.error,
      });
    }

    const normalized = Array.isArray(data?.data)
      ? data.data.map((item) => ({
          source: { name: item?.source ?? "" },
          author: item?.author ?? null,
          title: item?.title ?? "",
          description: item?.description ?? "",
          url: item?.url ?? "",
          urlToImage: item?.image ?? null,
          publishedAt: item?.published_at ?? null,
        }))
      : [];

    return res.status(200).json({ articles: normalized });
  } catch (err) {
    return res.status(500).json({ error: err?.message ?? "Unknown error" });
  }
}
