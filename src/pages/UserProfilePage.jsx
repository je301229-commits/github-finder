import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser, getUserRepos } from "../services/githubApi";
import RepoCard from "../components/RepoCard";

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0d1117",
    color: "#e6edf3",
    fontFamily: "inherit",
  },
  inner: {
    maxWidth: "860px",
    margin: "0 auto",
    padding: "32px 24px 64px",
  },
  backBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "none",
    border: "0.5px solid #30363d",
    color: "#7d8590",
    fontSize: "13px",
    padding: "6px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "24px",
    transition: "color 0.15s, borderColor 0.15s",
  },

  // Profile card
  profileCard: {
    background: "#161b22",
    border: "0.5px solid #30363d",
    borderRadius: "12px",
    padding: "32px",
    display: "flex",
    gap: "28px",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  avatarWrap: { position: "relative", flexShrink: 0 },
  avatar: {
    width: "96px",
    height: "96px",
    borderRadius: "50%",
    border: "2px solid #21262d",
    display: "block",
  },
  onlineDot: {
    position: "absolute",
    bottom: "4px",
    right: "4px",
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    background: "#238636",
    border: "2px solid #161b22",
  },
  profileInfo: { flex: 1, minWidth: "200px" },
  profileName: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#e6edf3",
    margin: "0 0 2px",
  },
  profileHandle: {
    fontSize: "15px",
    color: "#7d8590",
    margin: "0 0 12px",
  },
  profileBio: {
    fontSize: "14px",
    color: "#adbac7",
    lineHeight: "1.6",
    margin: "0 0 16px",
  },
  metaRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "14px",
    marginBottom: "20px",
  },
  metaItem: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "13px",
    color: "#7d8590",
  },
  metaLink: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "13px",
    color: "#388bfd",
    textDecoration: "none",
  },

  // Stat pills
  statsRow: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  statPill: {
    background: "#21262d",
    border: "0.5px solid #30363d",
    borderRadius: "20px",
    padding: "5px 14px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "13px",
    color: "#7d8590",
  },
  statNum: {
    fontWeight: "600",
    color: "#e6edf3",
    fontSize: "13px",
  },

  // Profile actions
  profileActions: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    minWidth: "140px",
  },
  btnPrimary: {
    background: "#238636",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "8px 16px",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    width: "100%",
    textAlign: "center",
    textDecoration: "none",
    display: "block",
  },
  btnOutline: {
    background: "none",
    color: "#7d8590",
    border: "0.5px solid #30363d",
    borderRadius: "6px",
    padding: "8px 16px",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
  },

  // Repos section
  repoHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "36px 0 16px",
  },
  repoTitle: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#e6edf3",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  repoBadge: {
    background: "#21262d",
    border: "0.5px solid #30363d",
    color: "#7d8590",
    fontSize: "11px",
    fontWeight: "500",
    padding: "2px 8px",
    borderRadius: "20px",
  },
  divider: {
    height: "0.5px",
    background: "#21262d",
    margin: "0 0 16px",
  },
  repoList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  // Loading
  skeletonPage: {
    minHeight: "100vh",
    background: "#0d1117",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: "12px",
  },
  spinnerText: { fontSize: "14px", color: "#7d8590" },
};

function fmt(n) {
  if (!n && n !== 0) return "0";
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return n;
}

function UserProfilePage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [backHover, setBackHover] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getUser(username);
        const repoData = await getUserRepos(username);
        setUser(data);
        setRepos(repoData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [username]);

  if (loading) {
    return (
      <div style={styles.skeletonPage}>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <div style={{
          width: "32px", height: "32px",
          border: "2px solid #21262d", borderTop: "2px solid #388bfd",
          borderRadius: "50%", animation: "spin 0.8s linear infinite",
        }} />
        <p style={styles.spinnerText}>Loading profile…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={styles.skeletonPage}>
        <p style={{ color: "#e05252", fontSize: "15px" }}>User not found.</p>
        <button
          style={{ ...styles.btnOutline, width: "auto", marginTop: "12px" }}
          onClick={() => navigate(-1)}
        >
          ← Go back
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.inner}>

        {/* Back button */}
        <button
          style={{
            ...styles.backBtn,
            color: backHover ? "#e6edf3" : "#7d8590",
            borderColor: backHover ? "#6e7681" : "#30363d",
          }}
          onMouseEnter={() => setBackHover(true)}
          onMouseLeave={() => setBackHover(false)}
          onClick={() => navigate(-1)}
        >
          ← Back to Search
        </button>

        {/* Profile card */}
        <div style={styles.profileCard}>

          {/* Avatar */}
          <div style={styles.avatarWrap}>
            <img src={user.avatar_url} alt={user.login} style={styles.avatar} />
            <div style={styles.onlineDot} />
          </div>

          {/* Info */}
          <div style={styles.profileInfo}>
            <h1 style={styles.profileName}>{user.name || user.login}</h1>
            <p style={styles.profileHandle}>@{user.login}</p>

            {user.bio && <p style={styles.profileBio}>{user.bio}</p>}

            <div style={styles.metaRow}>
              {user.company && (
                <span style={styles.metaItem}>
                  🏢 {user.company}
                </span>
              )}
              {user.location && (
                <span style={styles.metaItem}>
                  📍 {user.location}
                </span>
              )}
              {user.blog && (
                <a
                  href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.metaLink}
                >
                  🔗 {user.blog}
                </a>
              )}
              {user.twitter_username && (
                <a
                  href={`https://twitter.com/${user.twitter_username}`}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.metaLink}
                >
                  🐦 @{user.twitter_username}
                </a>
              )}
            </div>

            {/* Stat pills */}
            <div style={styles.statsRow}>
              <div style={styles.statPill}>
                <span style={styles.statNum}>{fmt(user.public_repos)}</span> repos
              </div>
              <div style={styles.statPill}>
                <span style={styles.statNum}>{fmt(user.followers)}</span> followers
              </div>
              <div style={styles.statPill}>
                <span style={styles.statNum}>{fmt(user.following)}</span> following
              </div>
              {user.public_gists > 0 && (
                <div style={styles.statPill}>
                  <span style={styles.statNum}>{fmt(user.public_gists)}</span> gists
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div style={styles.profileActions}>
            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              style={styles.btnPrimary}
            >
              View on GitHub
            </a>
            <button style={styles.btnOutline}>
              🤍 Save
            </button>
          </div>

        </div>

        {/* Repos section */}
        <div style={styles.repoHeader}>
          <div style={styles.repoTitle}>
            Repositories
            <span style={styles.repoBadge}>{repos.length}</span>
          </div>
        </div>
        <div style={styles.divider} />

        <div style={styles.repoList}>
          {repos.length === 0 ? (
            <p style={{ color: "#7d8590", fontSize: "14px", textAlign: "center", padding: "32px 0" }}>
              No public repositories found.
            </p>
          ) : (
            repos.map((repo) => <RepoCard key={repo.id} repo={repo} />)
          )}
        </div>

      </div>
    </div>
  );
}

export default UserProfilePage;