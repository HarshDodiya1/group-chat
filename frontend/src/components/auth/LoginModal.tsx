"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "../ui/button";

const handleGoogleLogin = async () => {
  signIn("google", {
    redirect: true,
    callbackUrl: "/dashboard",
  });
};

const LoginModal = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Getting start</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">Welcome to QuickChat</DialogTitle>
            <DialogDescription>
              QuickChat makes it effortless to create secure chat links and
              start conversations in seconds.
            </DialogDescription>
          </DialogHeader>
          <Button variant="outline" onClick={handleGoogleLogin}>
            <Image
              src="/images/google.png"
              className=" mr-4"
              width={25}
              height={25}
              alt="google"
            />
            Continue with Google
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginModal;
