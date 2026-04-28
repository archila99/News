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
    <div className="container mt-4">
      <div className="row">
        {articles.map((a, i) => (
          <div className="col-md-4 mb-4" key={i}>
            <div className="card h-100">
              {a.urlToImage && (
                <img src={a.urlToImage} className="card-img-top" alt={a.title} />
              )}

              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{a.title}</h5>
                <p className="card-text">{a.description}</p>

                <a
                  href={a.url}
                  className="btn btn-primary mt-auto"
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
