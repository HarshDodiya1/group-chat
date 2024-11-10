"use client";
import ChatNav from "@/components/chat/ChatNav";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatUserDialog from "@/components/chat/ChatUserDialog";
import Chats from "@/components/chat/Chats";
import { useEffect, useState } from "react";

export default function ChatBase({
  group,
  users,
  oldMessages,
}: {
  group: GroupChatType;
  users: Array<GroupChatUserType> | [];
  oldMessages: Array<MessageType> | [];
}) {
  // let socket = useMemo(() => {
  //   const socket = getSocket();
  //   socket.auth = {
  //     room: groupId,
  //   };
  //   return socket.connect();
  // }, []);

  // useEffect(() => {
  //   socket.on("message", (data: any) => {
  //     console.log("The message is : ", data);
  //   });
  //   return () => {
  //     socket.close();
  //   };
  // }, []);

  const [open, setOpen] = useState(true);
  const [chatUser, setChatUser] = useState<GroupChatUserType>();
  useEffect(() => {
    const data = localStorage.getItem(group.id);
    if (data) {
      const pData = JSON.parse(data);
      setChatUser(pData);
    }
  }, [group.id]);

  return (
    <div className="flex">
      <ChatSidebar users={users} />
      <div className="w-full md:w-4/5 bg-gradient-to-b from-gray-50 to-white">
        {open ? (
          <ChatUserDialog open={open} setOpen={setOpen} group={group} />
        ) : (
          <ChatNav chatGroup={group} users={users} user={chatUser} />
        )}

        {/* Messages */}
        <Chats group={group} chatUser={chatUser} oldMessages={oldMessages} />
      </div>
    </div>
  );
}
