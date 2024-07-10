import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import User from '@models/User';
import connectDb from '@app/db/connectDB';

const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackUrl: 'http://localhost:3000/api/auth/callback/github',
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email }) {
      if (account.provider === 'github') {
        try {
          await connectDb()

          const currentUser = await User.findOne({ email: user.email });

          if (!currentUser) {
            await User.create({
              email: user.email,
              username: user.email.split('@')[0],
            });
            console.log('New user created');
          }

          return true;


        } catch (error) {
          console.error('Error in signIn callback:', error);
          return false;
        }
      }
      return true;
    },

    async session({ session }) {
      try {
        await connectDb();
        console.log('Database connected in session callback');
        
        const dbUser = await User.findOne({ email: session.user.email });
        // 'User fetched from database:', dbUser);

        if (dbUser) {
          session.user.name = dbUser.username;
          session.user.id = dbUser._id.toString();
        }
        return session;
      } catch (error) {
        console.error('Error in session callback:', error);
        return session;
      }
    },
  },

  debug: true, // Enable debug messages in console
};

// Export handlers for each HTTP method
export const GET = (req, res) => NextAuth(req, res, options);
export const POST = (req, res) => NextAuth(req, res, options);
