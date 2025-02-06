// Store data in memory
let registeredUsers = [];
let borrowingHistory = [];

// Sample books data
const books = [
    { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 2, title: '1984', author: 'George Orwell' },
    { id: 3, title: 'Pride and Prejudice', author: 'Jane Austen' },
    { id: 4, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger' }
];

// Tab functionality
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

// Registration form submission
document.getElementById('registrationForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        id: Date.now(),
        name: e.target.name.value,
        age: e.target.age.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        className: e.target.className.value,
        address: e.target.address.value
    };
    
    registeredUsers.push(formData);
    updateStudentSelect();
    e.target.reset();
    alert('Registration successful!');
});

// Update student select dropdown
function updateStudentSelect() {
    const select = document.getElementById('studentSelect');
    select.innerHTML = '<option value="">Select a student</option>';
    
    registeredUsers.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = `${user.name} - ${user.className}`;
        select.appendChild(option);
    });
}

// Update book select dropdown
function updateBookSelect() {
    const select = document.getElementById('bookSelect');
    select.innerHTML = '<option value="">Select a book</option>';
    
    books.forEach(book => {
        const option = document.createElement('option');
        option.value = book.id;
        option.textContent = `${book.title} by ${book.author}`;
        select.appendChild(option);
    });
}

// Borrow book functionality
function borrowBook() {
    const studentId = document.getElementById('studentSelect').value;
    const bookId = document.getElementById('bookSelect').value;
    
    if (!studentId || !bookId) {
        alert('Please select both a student and a book');
        return;
    }
    
    const student = registeredUsers.find(u => u.id.toString() === studentId);
    const book = books.find(b => b.id.toString() === bookId);
    
    const borrowRecord = {
        date: new Date(),
        userId: student.id,
        userName: student.name,
        bookId: book.id,
        bookTitle: book.title
    };
    
    borrowingHistory.push(borrowRecord);
    updateBorrowingHistory();
    
    document.getElementById('studentSelect').value = '';
    document.getElementById('bookSelect').value = '';
    alert('Book borrowed successfully!');
}

// Update borrowing history table
function updateBorrowingHistory() {
    const tbody = document.querySelector('#historyTable tbody');
    tbody.innerHTML = '';
    
    borrowingHistory.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${new Date(record.date).toLocaleDateString()}</td>
            <td>${record.userName}</td>
            <td>${record.bookTitle}</td>
        `;
        tbody.appendChild(row);
    });
}

// Initialize book select
updateBookSelect();