import {
  authOptions,
  CustomSession,
} from "@/app/api/auth/[...nextauth]/options";
import DashNav from "@/components/chatGroup/DashNav";
import { getServerSession } from "next-auth";

export default async function dashboard() {
  const session: CustomSession | null = await getServerSession(authOptions);
  return (
    <div className="flex flex-col h-screen">
      <DashNav
        name={session?.user?.name!}
        image={session?.user?.image ?? undefined}
      />
      <div className="flex-1 flex justify-center items-center">
        <h1 className="text-2xl">Welcome to QuickChat</h1>
        <div>
          <p>This is the session data: {JSON.stringify(session)}</p>
        </div>
      </div>
    </div>
  );
}
