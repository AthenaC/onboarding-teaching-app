import { View, Text, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <StatusBar style="auto" />
      <View className="container mx-auto px-4 py-8">
        <Text className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Cross-Platform Template
        </Text>
        
        <View className="bg-white rounded-lg shadow-md p-6 mb-6">
          <Text className="text-2xl font-semibold text-gray-800 mb-4">
            Welcome to Your Cross-Platform App
          </Text>
          <Text className="text-gray-600 mb-4">
            This template provides a solid foundation for building cross-platform applications
            with React, React Native, and Node.js.
          </Text>
          
          <View className="space-y-4 mt-6">
            <View className="bg-blue-50 p-4 rounded-lg">
              <Text className="font-semibold text-blue-800 mb-2">Backend</Text>
              <Text className="text-blue-600 text-sm">Express.js API with TypeScript</Text>
            </View>
            <View className="bg-green-50 p-4 rounded-lg">
              <Text className="font-semibold text-green-800 mb-2">Frontend</Text>
              <Text className="text-green-600 text-sm">React with Vite and Tailwind</Text>
            </View>
            <View className="bg-purple-50 p-4 rounded-lg">
              <Text className="font-semibold text-purple-800 mb-2">Mobile</Text>
              <Text className="text-purple-600 text-sm">React Native with Expo</Text>
            </View>
          </View>
        </View>

        <View className="bg-white rounded-lg shadow-md p-6">
          <Text className="text-2xl font-semibold text-gray-800 mb-4">
            Getting Started
          </Text>
          <View className="space-y-2">
            <Text className="text-sm text-gray-600">
              • Run <Text className="bg-gray-100 px-2 py-1 rounded">npm run dev</Text> to start all services
            </Text>
            <Text className="text-sm text-gray-600">
              • Check the <Text className="bg-gray-100 px-2 py-1 rounded">SETUP_GUIDE.md</Text> for detailed instructions
            </Text>
            <Text className="text-sm text-gray-600">
              • Customize the components and add your features
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
} 