import Avatar from "@mui/material/Avatar";
import AvatarBadge from "../AvatarBadge";

function ChatHeader({ selectedUser }) {
  return (
    <div className="flex items-center gap-2.5 bg-transparent shrink-0">
      <AvatarBadge alt={selectedUser?.username} src={selectedUser?.profilePic} userId={selectedUser._id} />
      <h3 className="text-lg font-semibold">{selectedUser?.fullName}</h3>
    </div>
  );
}

export default ChatHeader;
