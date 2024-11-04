import { LOGIN_URL } from "@/lib/apiEndPoints";
import { Account, AuthOptions, ISODateString, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import { redirect } from "next/navigation";
import axios, { AxiosError } from "axios";
import { config } from "@/config/config";

export interface CustomSession {
  user?: CustomUser;
  expires: ISODateString;
}

export interface CustomUser {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  provider?: string | null;
  token?: string | null;
}

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/",
  },
  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: CustomUser;
      account: Account | null;
    }) {
      try {
        const payload = {
          email: user.email!,
          name: user.name!,
          oauth_id: account?.providerAccountId!,
          provider: account?.provider!,
          image: user?.image,
        };
        const { data } = await axios.post(LOGIN_URL, payload);

        user.id = data?.user?.id?.toString();
        user.token = data?.user?.token;
        return true;
      } catch (error) {
        if (error instanceof AxiosError) {
          return redirect(`/auth/error?message=what${error.message}`);
        }
        return redirect(
          `/auth/error?message=Something went wrong.please try again!`
        );
      }
    },

    async session({
      session,
      token,
      user,
    }: {
      session: CustomSession;
      token: JWT;
      user: User;
    }) {
      session.user = token.user as CustomUser;
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },

  providers: [
    GoogleProvider({
      clientId: config.google_client_id as string,
      clientSecret: config.google_client_secret as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
};
