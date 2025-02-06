import React, { useState } from 'react';

interface BookBorrowingProps {
  registeredUsers: any[];
  onSubmit: (data: any) => void;
}

const books = [
  { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
  { id: 2, title: '1984', author: 'George Orwell' },
  { id: 3, title: 'Pride and Prejudice', author: 'Jane Austen' },
  { id: 4, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger' },
];

const BookBorrowing: React.FC<BookBorrowingProps> = ({ registeredUsers, onSubmit }) => {
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedBook, setSelectedBook] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = registeredUsers.find(u => u.id.toString() === selectedUser);
    const book = books.find(b => b.id.toString() === selectedBook);
    
    if (user && book) {
      onSubmit({
        userId: user.id,
        userName: user.name,
        bookId: book.id,
        bookTitle: book.title,
        borrowDate: new Date().toISOString()
      });
      setSelectedUser('');
      setSelectedBook('');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Borrow Books</h2>
      {registeredUsers.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No registered users found. Please register first.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Select User</label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select a user</option>
              {registeredUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} - {user.className}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Book</label>
            <select
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select a book</option>
              {books.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title} by {book.author}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Borrow Book
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BookBorrowing;