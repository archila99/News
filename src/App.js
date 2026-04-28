import NewsList from "./components/NewsList";
function App() {
  return (
    <div className="news-shell">
      <header className="news-topbar">
        <div className="container py-3 d-flex align-items-center justify-content-between">
          <div className="news-brand">News</div>
          <div className="news-meta">US • Media</div>
        </div>
      </header>

      <main className="container py-4">
        <div className="mx-auto" style={{ maxWidth: 980 }}>
          <h1 className="news-hero-title display-5 mb-2">Top media headlines</h1>
          <p className="text-muted mb-4">
            A minimal feed of the latest entertainment and media stories.
          </p>
          <NewsList />
        </div>
      </main>
    </div>
  );
}

export default App;
