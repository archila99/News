import NewsList from "./components/NewsList";
function App() {
  return (
    <div className="text-center py-4 bg-light">
      <h1 className="display-4 fw-bold text-primary">Top media headlines in the US right now</h1>
      <NewsList />
    </div>
  );
}

export default App;
