import { Link } from "react-router-dom";
import { FaGithub, FaHeart } from "react-icons/fa";

function UserCard({ user, onAddFavorite }) {
  return (
    <div
      className="
        bg-[#161b22]
        rounded-2xl
        p-6
        flex
        flex-col
        items-center
        text-center
        shadow-lg
        hover:shadow-2xl
        hover:-translate-y-2
        transition-all
        duration-300
        border
        border-[#30363d]
        hover:border-[#388bfd]
        w-[280px]
      "
    >
      <img
        src={user.avatar_url}
        alt={user.login}
        className="
          w-24
          h-24
          rounded-full
          border-2
          border-[#21262d]
          mb-4
        "
      />

      <h3 className="text-[#e6edf3] text-xl font-bold">{user.login}</h3>

      <div className="flex items-center gap-2 text-[#7d8590] mt-2">
        <FaGithub />
        <span>GitHub Developer</span>
      </div>

      <div className="flex gap-5 mt-4">
        <div>
          <p className="font-bold text-[#388bfd]">{user.public_repos ?? "?"}</p>
          <p className="text-xs text-[#7d8590]">Repos</p>
        </div>

        <div>
          <p className="font-bold text-[#3fb950]">{user.followers ?? "?"}</p>
          <p className="text-xs text-[#7d8590]">Followers</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full mt-6">
        <Link
          to={`/user/${user.login}`}
          className="
            bg-[#238636]
            hover:bg-[#2ea043]
            text-white
            py-2
            rounded-xl
            font-semibold
            text-sm
            transition-colors
            duration-200
          "
        >
          View Profile
        </Link>

        <button
          onClick={() => onAddFavorite(user)}
          className="
            flex
            items-center
            justify-center
            gap-2
            bg-transparent
            hover:bg-[#21262d]
            text-[#7d8590]
            hover:text-[#e05252]
            border
            border-[#30363d]
            hover:border-[#e05252]
            py-2
            rounded-xl
            font-semibold
            text-sm
            transition-all
            duration-200
          "
        >
          <FaHeart />
          Add to Favorites
        </button>
      </div>
    </div>
  );
}

export default UserCard;
