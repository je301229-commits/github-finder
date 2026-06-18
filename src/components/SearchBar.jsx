import { useState } from "react";

function SearchBar({ onSearch, isLoading }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "580px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "#161b22",
          border: `0.5px solid ${focused ? "#388bfd" : "#30363d"}`,
          borderRadius: "10px",
          padding: "4px 4px 4px 14px",
          transition: "border-color 0.2s ease",
          gap: "8px",
        }}
      >
        {/* Search icon */}
        <svg
          width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke={focused ? "#388bfd" : "#7d8590"}
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ flexShrink: 0, transition: "stroke 0.2s ease" }}
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        {/* Input */}
        <input
          type="text"
          placeholder="Search GitHub users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={isLoading}
          style={{
            flex: 1,
            background: "none",
            border: "none",
            outline: "none",
            fontSize: "15px",
            color: "#e6edf3",
            padding: "8px 0",
            caretColor: "#388bfd",
          }}
        />

        {/* Clear button — only shows when there's text */}
        {query && !isLoading && (
          <button
            type="button"
            onClick={() => setQuery("")}
            style={{
              background: "none",
              border: "none",
              color: "#7d8590",
              cursor: "pointer",
              padding: "0 4px",
              fontSize: "18px",
              lineHeight: 1,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
            }}
            aria-label="Clear search"
          >
            ×
          </button>
        )}

        {/* Submit button — hugs the right edge inside the box */}
        <button
          type="submit"
          disabled={isLoading}
          style={{
            background: isLoading ? "#1a6329" : "#238636",
            color: "#fff",
            border: "none",
            borderRadius: "7px",
            padding: "8px 18px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: isLoading ? "not-allowed" : "pointer",
            whiteSpace: "nowrap",
            flexShrink: 0,
            transition: "background 0.15s ease",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            opacity: isLoading ? 0.7 : 1,
          }}
          onMouseEnter={(e) => { if (!isLoading) e.currentTarget.style.background = "#2ea043"; }}
          onMouseLeave={(e) => { if (!isLoading) e.currentTarget.style.background = "#238636"; }}
        >
          {isLoading ? (
            <>
              <span style={{
                width: "12px", height: "12px",
                border: "2px solid rgba(255,255,255,0.3)",
                borderTop: "2px solid #fff",
                borderRadius: "50%",
                display: "inline-block",
                animation: "spin 0.7s linear infinite",
              }} />
              Searching…
            </>
          ) : (
            "Search"
          )}
        </button>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </form>
  );
}

export default SearchBar;