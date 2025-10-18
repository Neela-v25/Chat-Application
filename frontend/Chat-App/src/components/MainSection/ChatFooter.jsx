import SendIcon from "@mui/icons-material/Send";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../features/chat/userThunks";
import { useRef, useState } from "react";

function ChatFooter({ selectedUser }) {
  const dispatch = useDispatch();
  const messageRef = useRef(null);
  const fileRef = useRef(null);
  const [imgPreview, setImgPreview] = useState(null);

  const handleSendMessage = () => {
    if(!messageRef?.current.value && !imgPreview) return;
    if (messageRef.current || imgPreview) {
      const messageToSend = {
        text: messageRef?.current?.value,
        image: imgPreview || null,
        receiverId: selectedUser._id,
      };
      dispatch(sendMessage(messageToSend));
      messageRef.current.value = "";
      fileRef.current.value = "";
      setImgPreview(null)
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setImgPreview(reader.result);
    };
  };

  const handleRemoveImage = () => {
    setImgPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleUploadClick = () => {
    fileRef?.current.click();
  };

  return (
    <div className="flex gap-4 p-2 h-20 w-11/12 border rounded mt-auto">
      {imgPreview && (
        <div className="relative w-20 h-20">
          <img src={imgPreview} alt="" className="opacity-50 rounded-xl" />
          <button
            className="absolute top-0.5 right-0.5 z-10 text-white bg-black rounded-full w-5 h-5 cursor-pointer text-sm"
            onClick={handleRemoveImage}
          >
            x
          </button>
        </div>
      )}
      <input
        type="file"
        className="hidden"
        ref={fileRef}
        onChange={handleFileUpload}
      />
      <FileUploadIcon
        className="self-center cursor-pointer"
        onClick={handleUploadClick}
      />
      <textarea
        className="w-full p-2 border-none rounded resize-none outline-0 shadow-md"
        placeholder="Type a message..."
        rows={2}
        ref={messageRef}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
          }
        }}
      />
      <SendIcon
        className="self-center shrink-0 cursor-pointer"
        onClick={handleSendMessage}
      />
    </div>
  );
}

export default ChatFooter;
