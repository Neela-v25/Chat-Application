import Avatar from "@mui/material/Avatar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { getMessages } from "../../features/chat/userThunks";
import SkeletonLoader from "../Skeleton";
import { FormatTime } from "../../lib/timeFormatter";
import { subscribeToMessages, unsubscribeFromMessages } from "../../features/socket/socketThunks";

function ChatComponent({ selectedUser }) {
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  const messageHistory = useSelector((state) => state.user.messageHistory);
  const isMessagesLoading = useSelector(
    (state) => state.user.isMessagesLoading
  );
  const chatEndRef = useRef(null)

  const style = {
    loggedInUser: "ml-auto bg-blue-400 rounded-br-3xl",
    selectedUser: "bg-white text-black rounded-bl-3xl",
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedUser) {
      dispatch(getMessages(selectedUser._id));
      dispatch(subscribeToMessages(selectedUser._id));
    }

    return () => {
      dispatch(unsubscribeFromMessages());
    }
  }, [dispatch, selectedUser]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageHistory]); 

  return (
    <div className="overflow-y-auto max-w-11/12 p-3 bg-pink-100 border-0 rounded-2xl h-10/12">
      <div className="space-y-2">
        {messageHistory?.map((msg) => {
          return (
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
                {msg.text && msg.image && (
                  <div className="flex flex-col">
                    <img src={msg.image} alt="" className="h-30 w-30" />
                    <p>{msg.text}</p>
                  </div>
                )}
                {msg.text && !msg.image ? msg.text : (!msg.text && msg.image) &&
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
          );
        })}
        <div ref={chatEndRef} />
      </div>
      {isMessagesLoading && <SkeletonLoader />}
    </div>
  );
}

export default ChatComponent;
