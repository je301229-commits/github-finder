function RepoCard({ repo }) {
  const langColors = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python:     "#3572A5",
    Rust:       "#dea584",
    Go:         "#00ADD8",
    HTML:       "#e34c26",
    CSS:        "#563d7c",
    Java:       "#b07219",
    "C++":      "#f34b7d",
    C:          "#555555",
    Ruby:       "#701516",
    Swift:      "#F05138",
    Kotlin:     "#A97BFF",
    Vue:        "#41b883",
    Dart:       "#00B4AB",
    Shell:      "#89e051",
  };

  const langColor = langColors[repo.language] || "#7d8590";

  function fmt(n) {
    if (!n && n !== 0) return "0";
    if (n >= 1000) return (n / 1000).toFixed(1) + "k";
    return n;
  }

  return (
    <div
      style={{
        background: "#161b22",
        border: "0.5px solid #30363d",
        borderRadius: "10px",
        padding: "18px 20px",
        transition: "border-color 0.2s ease, transform 0.15s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#388bfd";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#30363d";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* ── Top row: name + language badge ── */}
      <div style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "12px",
        marginBottom: "8px",
      }}>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          style={{
            color: "#388bfd",
            fontWeight: "600",
            fontSize: "14px",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            lineHeight: "1.4",
          }}
          onMouseEnter={(e) => e.currentTarget.style.textDecoration = "underline"}
          onMouseLeave={(e) => e.currentTarget.style.textDecoration = "none"}
        >
          {/* Repo icon */}
          <svg width="14" height="14" viewBox="0 0 16 16" fill="#7d8590" aria-hidden="true" style={{ flexShrink: 0, marginTop: "1px" }}>
            <path d="M2 2.5A2.5 2.5 0 014.5 0h7A2.5 2.5 0 0114 2.5v10.042a.5.5 0 01-.724.447L8 10.06l-5.276 2.93A.5.5 0 012 12.54V2.5zm2.5-1A1.5 1.5 0 003 2.5v9.348l4.276-2.375a.5.5 0 01.448 0L12 11.848V2.5A1.5 1.5 0 0010.5 1.5h-7z"/>
          </svg>
          {repo.name}
        </a>

        {repo.language && (
          <span style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            background: "#21262d",
            border: "0.5px solid #30363d",
            color: "#7d8590",
            fontSize: "11px",
            fontWeight: "500",
            padding: "3px 10px",
            borderRadius: "20px",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}>
            <span style={{
              width: "8px", height: "8px",
              borderRadius: "50%",
              background: langColor,
              display: "inline-block",
              flexShrink: 0,
            }} />
            {repo.language}
          </span>
        )}
      </div>

      {/* ── Description ── */}
      {repo.description && (
        <p style={{
          color: "#7d8590",
          fontSize: "13px",
          lineHeight: "1.6",
          margin: "0 0 14px",
        }}>
          {repo.description}
        </p>
      )}

      {/* ── Meta row: stars, forks, license ── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        fontSize: "12px",
        color: "#7d8590",
        flexWrap: "wrap",
      }}>
        {/* Stars */}
        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="#7d8590" aria-hidden="true">
            <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>
          </svg>
          {fmt(repo.stargazers_count)}
        </span>

        {/* Forks */}
        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="#7d8590" aria-hidden="true">
            <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-.878a2.25 2.25 0 111.5 0v.878a2.25 2.25 0 01-2.25 2.25h-1.5v2.128a2.251 2.251 0 11-1.5 0V8.5h-1.5A2.25 2.25 0 013 6.25v-.878a2.25 2.25 0 111.5 0zM5 3.25a.75.75 0 10-1.5 0 .75.75 0 001.5 0zm6.75.75a.75.75 0 100-1.5.75.75 0 000 1.5zm-3 8.75a.75.75 0 10-1.5 0 .75.75 0 001.5 0z"/>
          </svg>
          {fmt(repo.forks_count)}
        </span>

        {/* License */}
        {repo.license?.spdx_id && (
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="#7d8590" aria-hidden="true">
              <path d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l-.53.53a.75.75 0 00.154-.838L2.78 4.5h1.205a1.75 1.75 0 00.875-.233l1.288-.737a.25.25 0 01.125-.03h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.125.03l1.288.737c.275.15.574.233.875.233h1.205l-2.074 4.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.516 3.516 0 00.686.45C12.444 10.78 13.12 11 14 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L14.22 4.5h.53a.75.75 0 000-1.5h-2.234a.25.25 0 01-.125-.03l-1.288-.737A1.75 1.75 0 0010.228 2H9.25V.75z"/>
            </svg>
            {repo.license.spdx_id}
          </span>
        )}

        {/* Updated date */}
        {repo.updated_at && (
          <span style={{ marginLeft: "auto", fontSize: "11px", color: "#484f58" }}>
            Updated {new Date(repo.updated_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
        )}
      </div>
    </div>
  );
}

export default RepoCard;