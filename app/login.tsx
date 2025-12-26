import { router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useUser } from './context/userContext';

const Login = () => {
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Login Failed', error.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-primary px-5 justify-center">
      <Text className="text-white text-3xl font-bold mb-8 text-center">
        Login
      </Text>

      <TextInput
        className="bg-dark-100 text-white px-4 py-3 rounded-lg mb-4"
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        className="bg-dark-100 text-white px-4 py-3 rounded-lg mb-6"
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        className="bg-accent py-4 rounded-lg mb-4"
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-center font-bold text-base">
            Login
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text className="text-light-200 text-center">
          Don't have an account?{' '}
          <Text className="text-accent font-semibold">Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;