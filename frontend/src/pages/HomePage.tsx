import React from 'react'

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Cross-Platform Template
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Welcome to Your Cross-Platform App
          </h2>
          <p className="text-gray-600 mb-4">
            This template provides a solid foundation for building cross-platform applications
            with React, React Native, and Node.js.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Backend</h3>
              <p className="text-blue-600 text-sm">Express.js API with TypeScript</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Frontend</h3>
              <p className="text-green-600 text-sm">React with Vite and Tailwind</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">Mobile</h3>
              <p className="text-purple-600 text-sm">React Native with Expo</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Getting Started
          </h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Run <code className="bg-gray-100 px-2 py-1 rounded">npm run dev</code> to start all services</p>
            <p>• Check the <code className="bg-gray-100 px-2 py-1 rounded">SETUP_GUIDE.md</code> for detailed instructions</p>
            <p>• Customize the components and add your features</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage 