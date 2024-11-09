import ChatBase from "@/components/chat/ChatBase";
import { fetchChats } from "@/fetch/chatsFetch";
import { fetchChatGroup, fetchChatGroupUsers } from "@/fetch/groupFetch";
import { notFound } from "next/navigation";

export default async function chatsPage({
  params,
}: {
  params: { id: string };
}) {
  console.log("This is the params", params);
  if (params.id.length !== 36) {
    return notFound();
  }
  const chatGroup: GroupChatType | null = await fetchChatGroup(params.id);
  if (chatGroup === null) {
    return notFound();
  }

  const chatGroupUsers: Array<GroupChatUserType> | [] =
    await fetchChatGroupUsers(params?.id);

  const chats: Array<MessageType> | [] = await fetchChats(params.id);

  return (
    <div>
      <ChatBase group={chatGroup} users={chatGroupUsers} oldMessages={chats} />
    </div>
  );
}
