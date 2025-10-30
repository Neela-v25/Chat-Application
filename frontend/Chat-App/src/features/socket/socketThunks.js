import { userActions } from "../chat/userSlice";

export const subscribeToMessages = (selectedUser) => (dispatch, getState) => {

  if (!selectedUser) return;

  const socket = getState().socket.socket;
  if (!socket) return;

  socket.off("newMessage");

  socket.on("newMessage", (newMessage) => {
    const isMessageFromSelectedUser = newMessage.senderId.toString() === selectedUser;

    if (!isMessageFromSelectedUser) return;

    dispatch(userActions.addMessage(newMessage));
  });
};

export const unsubscribeFromMessages = () => (dispatch, getState) => {
  const socket = getState().socket.socket;
  if (!socket) return;

  socket.off("newMessage");
};
