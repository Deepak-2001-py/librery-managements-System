import React, { useState } from 'react';
import { Book, User, Library, BookOpen } from 'lucide-react';
import RegistrationForm from './components/RegistrationForm';
import BookBorrowing from './components/BookBorrowing';
import BorrowingHistory from './components/BorrowingHistory';

function App() {
  const [activeTab, setActiveTab] = useState('register');
  const [registeredUsers, setRegisteredUsers] = useState<any[]>([]);
  const [borrowingHistory, setBorrowingHistory] = useState<any[]>([]);

  const handleRegistration = (userData: any) => {
    setRegisteredUsers([...registeredUsers, { ...userData, id: Date.now() }]);
  };

  const handleBorrowing = (borrowData: any) => {
    setBorrowingHistory([...borrowingHistory, { ...borrowData, date: new Date().toISOString() }]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-indigo-600 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Library className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Library Management System</h1>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('register')}
            className={\`flex items-center px-4 py-2 rounded-lg \${
              activeTab === 'register'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }\`}
          >
            <User className="w-5 h-5 mr-2" />
            Registration
          </button>
          <button
            onClick={() => setActiveTab('borrow')}
            className={\`flex items-center px-4 py-2 rounded-lg \${
              activeTab === 'borrow'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }\`}
          >
            <Book className="w-5 h-5 mr-2" />
            Borrow Books
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={\`flex items-center px-4 py-2 rounded-lg \${
              activeTab === 'history'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }\`}
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Borrowing History
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {activeTab === 'register' && (
            <RegistrationForm onSubmit={handleRegistration} />
          )}
          {activeTab === 'borrow' && (
            <BookBorrowing 
              registeredUsers={registeredUsers}
              onSubmit={handleBorrowing}
            />
          )}
          {activeTab === 'history' && (
            <BorrowingHistory history={borrowingHistory} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;