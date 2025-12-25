import { Account, Client, ID } from 'react-native-appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);

export const authService = {
  // Create account
  async createAccount(email: string, password: string, name: string) {
    try {
      const user = await account.create(ID.unique(), email, password, name);
      return user;
    } catch (error) {
      console.error('Error creating account:', error);
      throw error;
    }
  },

  // Login
  async login(email: string, password: string) {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      return session;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const user = await account.get();
      return user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  // Logout
  async logout() {
    try {
      await account.deleteSession('current');
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  },

  // Update user name
  async updateName(name: string) {
    try {
      const user = await account.updateName(name);
      return user;
    } catch (error) {
      console.error('Error updating name:', error);
      throw error;
    }
  },

  // Update user email
  async updateEmail(email: string, password: string) {
    try {
      const user = await account.updateEmail(email, password);
      return user;
    } catch (error) {
      console.error('Error updating email:', error);
      throw error;
    }
  },

  // Update password
  async updatePassword(newPassword: string, oldPassword: string) {
    try {
      const user = await account.updatePassword(newPassword, oldPassword);
      return user;
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  },
};