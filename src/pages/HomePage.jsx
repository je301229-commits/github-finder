import { useState } from "react";
import SearchBar from "../components/SearchBar";
import { searchUsers } from "../services/githubApi";
import UserCard from "../components/UserCard";
import { supabase } from "../services/supabase";

function SkeletonCard() {
  return (
    <div style={{
      background: "#161b22",
      border: "0.5px solid #21262d",
      borderRadius: "12px",
      padding: "24px 20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "12px",
      width: "240px",
    }}>
      <div className="skel" style={{ width: "80px", height: "80px", borderRadius: "50%" }} />
      <div className="skel" style={{ width: "120px", height: "14px" }} />
      <div className="skel" style={{ width: "80px",  height: "12px" }} />
      <div className="skel" style={{ width: "100%", height: "32px", borderRadius: "6px" }} />
      <div className="skel" style={{ width: "100%", height: "32px", borderRadius: "6px" }} />
    </div>
  );
}

function Toast({ toast }) {
  if (!toast) return null;

  const colors = {
    success: { bg: "#0f2a1a", border: "#238636", text: "#3fb950" },
    warn:    { bg: "#2d2208", border: "#d29922", text: "#d29922" },
    error:   { bg: "#3d1a1a", border: "#e05252", text: "#e05252" },
  };
  const c = colors[toast.type] || colors.success;

  return (
    <div style={{
      position: "fixed",
      bottom: "28px",
      left: "50%",
      transform: "translateX(-50%)",
      background: c.bg,
      border: `0.5px solid ${c.border}`,
      color: c.text,
      fontSize: "13px",
      fontWeight: "500",
      padding: "10px 20px",
      borderRadius: "8px",
      zIndex: 999,
      whiteSpace: "nowrap",
      boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      animation: "fadeUp 0.2s ease",
    }}>
      {toast.message}
    </div>
  );
}

function HomePage() {
  const [users, setUsers]       = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [searched, setSearched] = useState(false);
  const [lastQuery, setLastQuery] = useState("");
  const [toast, setToast]       = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    setSearched(true);
    setLastQuery(query);
    try {
      const results = await searchUsers(query);
      setUsers(results);
    } catch (err) {
      setError("Search failed. Please try again.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (user) => {
    const { data: existing } = await supabase
      .from("favorites")
      .select("id")
      .eq("github_id", user.id);

    if (existing && existing.length > 0) {
      showToast("Already in your favorites!", "warn");
      return;
    }

    const { error } = await supabase.from("favorites").insert([{
      github_id:  user.id,
      username:   user.login,
      avatar_url: user.avatar_url,
    }]);

    if (error) {
      console.error("Insert Error:", error);
      showToast("Failed to save. Try again.", "error");
    } else {
      showToast(`⭐ ${user.login} added to favorites!`);
    }
  };

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateX(-50%) translateY(8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0);   }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .skel {
          background: linear-gradient(90deg, #21262d 25%, #2d333b 50%, #21262d 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 6px;
        }
        .results-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 16px;
          animation: fadeIn 0.3s ease;
        }
        .section-divider {
          flex: 1;
          height: 0.5px;
          background: #21262d;
        }
        .retry-btn {
          background: none;
          border: 0.5px solid #30363d;
          color: #7d8590;
          border-radius: 6px;
          padding: 8px 18px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s;
        }
        .retry-btn:hover {
          border-color: #6e7681;
          color: #e6edf3;
        }
        .stat-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #7d8590;
        }
        .stat-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #238636;
          display: inline-block;
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#0d1117", color: "#e6edf3" }}>

        <Toast toast={toast} />

        
        <div style={{ textAlign: "center", padding: "64px 24px 52px" }}>

          
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "7px",
            background: "rgba(56,139,253,0.1)",
            border: "0.5px solid rgba(56,139,253,0.3)",
            color: "#388bfd",
            fontSize: "12px", fontWeight: "500",
            padding: "4px 14px", borderRadius: "20px",
            marginBottom: "22px",
          }}>
            <span style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: "#388bfd", display: "inline-block",
            }} />
            Powered by GitHub API
          </div>

        
          <h1 style={{
            fontSize: "clamp(28px, 5vw, 44px)",
            fontWeight: "700",
            letterSpacing: "-0.5px",
            lineHeight: "1.15",
            color: "#e6edf3",
            margin: "0 0 14px",
          }}>
            Find any{" "}
            <span style={{ color: "#388bfd" }}>GitHub</span>{" "}
            developer
          </h1>

          
          <p style={{
            color: "#7d8590",
            fontSize: "16px",
            lineHeight: "1.6",
            margin: "0 auto 36px",
            maxWidth: "440px",
          }}>
            Search 100M+ developers and explore their repositories, followers, and contributions instantly.
          </p>

      
          <div style={{ maxWidth: "580px", margin: "0 auto 24px" }}>
            <SearchBar onSearch={handleSearch} isLoading={loading} />
          </div>

          
          <div style={{
            display: "flex", justifyContent: "center",
            alignItems: "center", gap: "20px",
            flexWrap: "wrap",
          }}>
            {[
              ["100M+", "developers"],
              ["400M+", "repositories"],
              ["Real-time", "data"],
            ].map(([val, label], i) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <div className="stat-item">
                  <span className="stat-dot" />
                  <strong style={{ color: "#e6edf3", fontWeight: "600" }}>{val}</strong>
                  <span>{label}</span>
                </div>
                {i < 2 && (
                  <div style={{ width: "1px", height: "14px", background: "#21262d" }} />
                )}
              </div>
            ))}
          </div>
        </div>

     
        <div style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 24px 80px",
        }}>

       
          {(searched || loading) && (
            <div style={{
              display: "flex", alignItems: "center", gap: "10px",
              fontSize: "12px", fontWeight: "500",
              color: "#7d8590",
              letterSpacing: "0.4px",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}>
              <span>
                {loading
                  ? `Searching for "${lastQuery}"…`
                  : error
                  ? "Something went wrong"
                  : `${users.length} result${users.length !== 1 ? "s" : ""} for "${lastQuery}"`
                }
              </span>
              <div className="section-divider" />
            </div>
          )}

          
          {loading && (
            <div className="results-grid">
              {Array(6).fill(null).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          
          {!loading && error && (
            <div style={{ textAlign: "center", padding: "72px 0" }}>
              <div style={{
                width: "52px", height: "52px", borderRadius: "50%",
                background: "#21262d",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 18px",
                fontSize: "24px",
              }}>
                ⚠️
              </div>
              <p style={{ color: "#e05252", fontSize: "15px", fontWeight: "500", marginBottom: "6px" }}>
                {error}
              </p>
              <p style={{ color: "#484f58", fontSize: "13px", marginBottom: "24px" }}>
                GitHub API may be rate-limited. Try again in a moment.
              </p>
              <button className="retry-btn" onClick={() => handleSearch(lastQuery)}>
                ↺ Retry search
              </button>
            </div>
          )}

         
          {!loading && !error && searched && users.length === 0 && (
            <div style={{ textAlign: "center", padding: "72px 0" }}>
              <div style={{
                width: "52px", height: "52px", borderRadius: "50%",
                background: "#21262d",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 18px",
                fontSize: "24px",
              }}>
                🔍
              </div>
              <p style={{ color: "#e6edf3", fontSize: "15px", fontWeight: "500", marginBottom: "6px" }}>
                No results for "{lastQuery}"
              </p>
              <p style={{ color: "#484f58", fontSize: "13px" }}>
                Try a different username or name
              </p>
            </div>
          )}

          
          {!loading && !searched && (
            <div style={{ textAlign: "center", padding: "72px 0" }}>
              <div style={{
                width: "52px", height: "52px", borderRadius: "50%",
                background: "#161b22",
                border: "0.5px solid #30363d",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 18px",
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                  stroke="#484f58" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                  aria-hidden="true">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>
              <p style={{ color: "#7d8590", fontSize: "15px", fontWeight: "500", marginBottom: "6px" }}>
                Search for a developer
              </p>
              <p style={{ color: "#484f58", fontSize: "13px" }}>
                Type a GitHub username or full name above
              </p>
            </div>
          )}

        {/* ── Results grid ── */}
          {!loading && !error && users.length > 0 && (
            <div className="results-grid">
              {users.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onAddFavorite={addToFavorites}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default HomePage;