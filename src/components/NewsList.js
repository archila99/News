import React, { useEffect, useState } from "react";

function NewsList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/news");
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          console.error("News API error:", data);
          setArticles([]);
          return;
        }
        setArticles(Array.isArray(data?.articles) ? data.articles : []);
      } catch (error) {
        console.error("Failed to fetch news:", error);
        setArticles([]);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="mt-4">
      <div className="row g-4">
        {articles.map((a, i) => (
          <div className="col-md-4 mb-4" key={i}>
            <div className="card news-card h-100">
              {a.urlToImage && (
                <img src={a.urlToImage} className="card-img-top" alt={a.title} />
              )}

              <div className="card-body d-flex flex-column">
                <div className="news-meta mb-2">
                  {(a.source && a.source.name) ? a.source.name : "Source"}{" "}
                  {a.publishedAt ? `• ${new Date(a.publishedAt).toLocaleDateString()}` : ""}
                </div>
                <h5 className="card-title news-title">{a.title}</h5>
                {a.description ? (
                  <p className="card-text news-desc">{a.description}</p>
                ) : null}

                <a
                  href={a.url}
                  className="btn btn-outline-dark news-link mt-auto"
                  target="_blank"
                  rel="noreferrer"
                >
                  Read more
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsList;
