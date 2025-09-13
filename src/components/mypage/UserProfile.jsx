import { useState } from "react";
import { useUserContext, useSupabaseAuth } from "../../supabase";
import { useToast } from "../Toast";
import Avatar from "../common/Avatar";
import { TEXTS } from "../../constants";

const UserProfile = ({ user }) => {
  const { setUser } = useUserContext();
  const { updateUserName } = useSupabaseAuth();
  const { showToast } = useToast();

  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(user?.userName || "");

  const handleSave = async () => {
    if (newName.trim() === "") {
      showToast(TEXTS.enterNickname, "error");
      return;
    }
    try {
      const updated = await updateUserName(newName);
      setUser(updated.user);
      setEditing(false);
    } catch (err) {
      showToast(`${TEXTS.updateNicknameFailed}${err.message}`, "error");
    }
  };

  const handleCancel = () => {
    setNewName(user.userName);
    setEditing(false);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-center gap-8">
      <div className="mx-auto sm:mx-0">
        <Avatar user={user} size="lg" />
      </div>

      <div className="text-center sm:text-left space-y-2 w-full">
        <div className="flex items-center justify-center sm:justify-start gap-3">
          {editing ? (
            <>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="bg-transparent border-b border-sky-400 text-white focus:outline-none text-base"
              />
              <button
                onClick={handleSave}
                className="text-md text-green-400 hover:underline"
              >
                {TEXTS.save}
              </button>
              <button
                onClick={handleCancel}
                className="text-md text-red-400 hover:underline"
              >
                {TEXTS.cancel}
              </button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-sky-300">
                {user.userName}
              </h2>
              <button
                className="text-sm text-sky-400 hover:underline"
                onClick={() => setEditing(true)}
              >
                {TEXTS.updateNickname}
              </button>
            </>
          )}
        </div>
        <p className="text-gray-300">{user.email}</p>
      </div>
    </div>
  );
};

export default UserProfile;
