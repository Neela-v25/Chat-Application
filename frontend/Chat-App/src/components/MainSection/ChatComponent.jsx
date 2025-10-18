import Avatar from "@mui/material/Avatar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMessages } from "../../features/chat/userThunks";
import SkeletonLoader from "../Skeleton";
import { FormatTime } from "../../lib/timeFormatter";

function ChatComponent({ selectedUser }) {
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  const messageHistory = useSelector((state) => state.user.messageHistory);
  const isMessagesLoading = useSelector(
    (state) => state.user.isMessagesLoading
  );

  const style = {
    loggedInUser: "ml-auto bg-blue-400 rounded-br-3xl",
    selectedUser: "bg-white text-black rounded-bl-3xl",
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedUser) {
      dispatch(getMessages(selectedUser._id));
    }
  }, [dispatch, selectedUser]);

  return (
    <div className="flex-1 max-h-9/12 overflow-y-auto max-w-11/12 p-3 bg-pink-100 border-0 rounded-2xl">
      <div className="space-y-2">
        {messageHistory?.map((msg) => {
          return (
            <>
              {/* <p className="text-black text-sm text-center">
                {FormatTime(msg.createdAt).day}
              </p> */}
              <span className="flex gap-1" key={msg._id}>
                {msg.senderId !== loggedInUser._id && (
                  <Avatar
                    alt={selectedUser?.username}
                    src={selectedUser?.profilePic}
                    sx={{
                      alignSelf: "flex-end",
                    }}
                  />
                )}
                <span
                  className={`${
                    msg.senderId === loggedInUser._id
                      ? style.loggedInUser
                      : style.selectedUser
                  } p-2 rounded shadow w-fit min-w-30`}
                >
                  {msg.text ||
                    (msg.image && (
                      <img src={msg.image} alt="Image" className="h-30 w-30" />
                    ))}
                  <p
                    className={`${
                      msg.senderId === loggedInUser._id && "text-right"
                    } text-xs font-sans mt-0.5`}
                  >
                    {FormatTime(msg.createdAt).time}
                  </p>
                </span>
                {msg.senderId === loggedInUser._id && (
                  <Avatar
                    alt={loggedInUser?.username}
                    src={loggedInUser?.profilePic}
                    sx={{
                      alignSelf: "flex-end",
                    }}
                  />
                )}
              </span>
            </>
          );
        })}
      </div>
      {isMessagesLoading && <SkeletonLoader />}
    </div>
  );
}

export default ChatComponent;
