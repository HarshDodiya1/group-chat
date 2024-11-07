"use client";
import { Button } from "@/components/ui/button";
import { getSocket } from "@/lib/socket.config";
import { useEffect, useMemo } from "react";
import { v4 as uuidV4 } from "uuid";

export default function ChatBase() {
  let socket = useMemo(() => {
    const socket = getSocket();

    return socket.connect();
  }, []);

  useEffect(() => {
    socket.on("message", (data: any) => {
      console.log("The message is : ", data);
    });
    return () => {
      socket.close();
    };
  }, []);

  const handleClick = () => {
    socket.emit("message", { name: "Harsh", id: uuidV4() });
  };
  return (
    <div>
      <Button onClick={handleClick}>Send Message</Button>
    </div>
  );
}
