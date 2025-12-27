// NextAuth configuration and API route
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb/connection";
import User from "@/lib/mongodb/models/User";

export const authOptions = {
  providers: [
    // Email/Password Authentication
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        await connectDB();

        // Find user by email
        const user = await User.findOne({
          email: credentials.email.toLowerCase(),
        });

        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        // Verify password
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Invalid email or password");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          nid: user.nid,
          contact: user.contact,
          role: user.role,
        };
      },
    }),

    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    // Called when user signs in
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        await connectDB();

        // Check if user exists
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          // Store Google user temporarily - they'll complete profile on register page
          user.needsProfile = true;
          user.role = "user"; // Default role
        } else {
          // User exists, attach their data
          user.id = existingUser._id.toString();
          user.nid = existingUser.nid;
          user.contact = existingUser.contact;
          user.role = existingUser.role;
        }
      }

      return true;
    },

    // Add custom fields to JWT
    async jwt({ token, user, account }) {
      if (user) {
        // Initial sign in
        token.id = user.id;
        token.nid = user.nid;
        token.contact = user.contact;
        token.role = user.role;
        token.needsProfile = user.needsProfile;
      } else if (token?.id) {
        // Subsequent checks: Fetch fresh role from DB to ensure it's up-to-date
        // This allows role changes (like admin promotion) to reflect without re-login
        try {
          await connectDB();
          const freshUser = await User.findById(token.id).select("role");
          if (freshUser) {
            token.role = freshUser.role;
          }
        } catch (error) {
          console.error("Error refreshing role in JWT:", error);
        }
      }
      return token;
    },

    // Add custom fields to session
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.nid = token.nid;
        session.user.contact = token.contact;
        session.user.role = token.role;
        session.user.needsProfile = token.needsProfile;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Enable NextAuth debugging
};

console.log(
  "NextAuth config loaded. Secret length:",
  process.env.NEXTAUTH_SECRET?.length
);

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
