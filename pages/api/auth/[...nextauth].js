import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { Sequelize } from 'sequelize';
import { User } from '../../../models/User';

// Initialize Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  logging: false
});

// Initialize User model
User.init(sequelize);

// Function to sync database
const syncDatabase = async () => {
  try {
    await User.sync();
    console.log('Database synced successfully');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

// Call sync function
syncDatabase();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const user = await User.findOne({ where: { email: credentials.email } });
          
          if (user && await bcrypt.compare(credentials.password, user.password)) {
            return {
              id: user.id,
              email: user.email,
              name: user.name
            };
          }
          return null;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  }
});