import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";

export default function AvatarBadge({sourceImg, alt, userId}) {
  const onlineUsers = useSelector((state) => state.socket.onlineUsers);
  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      badgeContent=""
      variant="dot"
      sx={{
        "& .MuiBadge-badge": {
          backgroundColor: onlineUsers.includes(userId)
            ? "#4caf50" // green
            : "#9e9e9e", // grey
          color: onlineUsers.includes(userId) ? "#4caf50" : "#9e9e9e",
          width: 14,
          height: 14,
          borderRadius: "50%",
          border: "2px solid white", // adds nice ring effect
        },
      }}
    >
      <Avatar alt={alt} src={sourceImg} />
    </Badge>
  );
}
