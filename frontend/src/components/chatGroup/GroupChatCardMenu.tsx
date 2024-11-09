"use client";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";

import EditGroupChat from "@/components/chatGroup/EditGroupChat";
import { config } from "@/config/config";
import { toast } from "sonner";
const DeleteChatGroup = dynamic(
  () => import("@/components/chatGroup/DeleteChatGroup")
);

export default function GroupChatCardMenu({
  group,
  user,
}: {
  group: GroupChatType;
  user: CustomUser;
}) {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editDialoag, setEditDialog] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(`${config.appUrl}/chat/${group.id}`);
    toast.success("Link copied successfully!");
  };

  return (
    <>
      {deleteDialog && (
        <Suspense fallback={<p>Loading...</p>}>
          <DeleteChatGroup
            open={deleteDialog}
            setOpen={setDeleteDialog}
            groupId={group.id}
            token={user.token!}
          />
        </Suspense>
      )}
      {editDialoag && (
        <Suspense fallback={<p>Loading...</p>}>
          <EditGroupChat
            open={editDialoag}
            setOpen={setEditDialog}
            user={user}
            group={group}
          />
        </Suspense>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger>
          <DotsVerticalIcon className="h-5 w-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleCopy}>Copy</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setEditDialog(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteDialog(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
