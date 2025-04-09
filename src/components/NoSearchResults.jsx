import "./NoSearchResults.css";
export default function NoSearchResults({ query }) {
    return (
      <div className="no-search-wrapper">
        <div className="no-search-message">
          <i className="fa-solid fa-magnifying-glass icon" />
          <h2>No results found</h2>
          {query && <p className="text-muted">We couldn't find anything for "<strong>{query}</strong>"</p>}
        </div>
      </div>
    );
  }
  