export const Profile = ({ profile }) => {
    if (!profile) return null;
  
    return (
      <div className="bg-gradient-to-br from-indigo-700 to-purple-800 text-white p-6 rounded-2xl shadow-lg w-64 mt-10 ml-6 sticky top-10">
        <div className="flex flex-col items-center text-center">
          {/* User Avatar Initial */}
          <div className="w-20 h-20 bg-indigo-400 rounded-full flex items-center justify-center text-3xl font-bold mb-4 border-4 border-white shadow-md">
            {profile.username?.[0] || "U"}
          </div>
  
          {/* Username */}
          <h2 className="text-xl font-semibold">{profile.username}</h2>
  
          {/* Email */}
          <p className="text-sm text-gray-300 mt-1">{profile.email}</p>
  
          {/* Coin Balance */}
          <div className="mt-4 bg-indigo-500 py-2 px-4 rounded-full text-sm font-medium shadow-inner">
            💰 Coins: {profile.coins}
          </div>
  
          {/* Theme Preview */}
          {profile.theme?.card_path && (
            <div className="mt-4">
              <p className="text-xs text-gray-300 mb-1">Card Theme:</p>
              Synth Wave
            </div>
          )}
  
          {/* Member Since */}
          <p className="text-xs text-gray-400 mt-4">
            Member since: {new Date(profile.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    );
  };