import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

function Navbar() {
  const location = useLocation();
  const [favCount, setFavCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    async function fetchCount() {
      const { count } = await supabase
        .from("favorites")
        .select("id", { count: "exact", head: true });
      setFavCount(count || 0);
    }
    fetchCount();

    const channel = supabase
      .channel("favorites-count")
      .on("postgres_changes", { event: "*", schema: "public", table: "favorites" }, fetchCount)
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <>
      <style>{`
        .nav-link-item {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition: background 0.15s ease, color 0.15s ease;
          position: relative;
        }
        .nav-link-item:hover {
          background: rgba(177,186,196,0.08);
        }
        .nav-link-item.active {
          color: #e6edf3 !important;
          background: rgba(177,186,196,0.1);
        }
        .fav-badge {
          background: #238636;
          color: #fff;
          font-size: 10px;
          font-weight: 600;
          min-width: 16px;
          height: 16px;
          padding: 0 4px;
          border-radius: 20px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          transition: transform 0.2s ease;
        }
        .fav-badge.bump {
          transform: scale(1.3);
        }
        .nav-divider {
          width: 1px;
          height: 18px;
          background: #21262d;
          margin: 0 4px;
        }
        .github-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: 0.5px solid #30363d;
          color: #7d8590;
          font-size: 13px;
          font-weight: 500;
          padding: 6px 14px;
          border-radius: 6px;
          text-decoration: none;
          transition: border-color 0.15s, color 0.15s, background 0.15s;
          cursor: pointer;
        }
        .github-btn:hover {
          border-color: #6e7681;
          color: #e6edf3;
          background: rgba(177,186,196,0.08);
        }
      `}</style>

      <nav style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        background: "rgba(13,17,23,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: scrolled
          ? "0.5px solid #30363d"
          : "0.5px solid transparent",
        transition: "border-color 0.2s ease",
      }}>

       
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "9px",
            textDecoration: "none",
            color: "#e6edf3",
          }}
        >
          
          <svg height="24" viewBox="0 0 16 16" width="24" fill="#7d8590" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>

          <span style={{ fontSize: "16px", fontWeight: "600", letterSpacing: "-0.2px" }}>
            GitHub Finder
          </span>
        </Link>

        
        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>

          <Link
            to="/"
            className={`nav-link-item ${isActive("/") ? "active" : ""}`}
            style={{ color: isActive("/") ? "#e6edf3" : "#7d8590" }}
          >
            
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            Search
          </Link>

          <div className="nav-divider" />

          <Link
            to="/favorites"
            className={`nav-link-item ${isActive("/favorites") ? "active" : ""}`}
            style={{ color: isActive("/favorites") ? "#e6edf3" : "#7d8590" }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
            </svg>
            Favorites
            {favCount > 0 && (
              <span className="fav-badge">{favCount > 99 ? "99+" : favCount}</span>
            )}
          </Link>

          <div className="nav-divider" />

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="github-btn"
          >
            <svg height="14" viewBox="0 0 16 16" width="14" fill="currentColor" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            GitHub
          </a>

        </div>
      </nav>
    </>
  );
}

export default Navbar;