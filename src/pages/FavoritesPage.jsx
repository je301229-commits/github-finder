import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import "./FavoritesPage.css";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchFavorites() {
      const { data, error } = await supabase.from("favorites").select("*");
      if (error) {
        console.error("Fetch Error:", error);
      } else {
        setFavorites(data);
      }
    }
    fetchFavorites();
  }, []);

  const removeFavorite = async (id) => {
    const { error } = await supabase.from("favorites").delete().eq("id", id);
    if (error) {
      console.error("Delete Error:", error);
    } else {
      setFavorites((prev) => prev.filter((user) => user.id !== id));
    }
  };

  return (
    <div className="favorites-page">

      <div className="favorites-header">
        <h1 className="favorites-title">
          ⭐ Favorite Developers
          <span className="favorites-title-count">{favorites.length}</span>
        </h1>
      </div>

      <div className="favorites-divider" />

      {favorites.length === 0 ? (
        <div className="favorites-empty">
          <span className="favorites-empty-icon">🤍</span>
          <p>No favorites yet</p>
          <span>Go search for developers and add them here</span>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((user) => (
            <div key={user.id} className="favorite-card">
              <img
                src={user.avatar_url}
                alt={user.username}
                className="favorite-avatar"
              />
              <h3>{user.username}</h3>
              <p className="favorite-card-handle">@{user.username}</p>
              <button
                className="remove-btn"
                onClick={() => removeFavorite(user.id)}
              >
                🗑 Remove
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default FavoritesPage;