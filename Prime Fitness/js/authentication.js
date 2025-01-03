// auth.js - Handle authentication logic

// User class to structure user data
class User {
    constructor(firstName, lastName, email, password) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
      this.workoutsCompleted = 0;
      this.currentStreak = 0;
      this.membershipStatus = 'Active';
      this.membershipType = 'Premium Member';
    }
  }
  
  // Helper function to hash passwords (basic implementation - in production use proper hashing)
  function hashPassword(password) {
    return btoa(password); // Basic encoding, not secure for production
  }
  
  // Handle sign up form submission
  function handleSignUp() {
    const signUpForm = document.querySelector('form');
    const signUpButton = document.querySelector('.login');
  
    signUpButton.addEventListener('click', (e) => {
      e.preventDefault();
      
      const firstName = document.getElementById('fname').value;
      const lastName = document.getElementById('lname').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      if (!firstName || !lastName || !email || !password) {
        alert('Please fill in all fields');
        return;
      }
  
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('users')) || {};
      if (users[email]) {
        alert('User already exists with this email');
        return;
      }
  
      // Create new user
      const newUser = new User(firstName, lastName, email, hashPassword(password));
      users[email] = newUser;
      localStorage.setItem('users', JSON.stringify(users));
  
      // Set current user
      localStorage.setItem('currentUser', email);
  
      // Redirect to dashboard
      window.location.href = 'dashboard.html';
    });
  }
  
  // Handle login form submission
  function handleLogin() {
    const loginButton = document.querySelector('.login');
  
    loginButton.addEventListener('click', (e) => {
      e.preventDefault();
  
      const email = document.getElementById('email-username').value;
      const password = document.getElementById('password').value;
  
      if (!email || !password) {
        alert('Please fill in all fields');
        return;
      }
  
      // Get users from storage
      const users = JSON.parse(localStorage.getItem('users')) || {};
      const user = users[email];
  
      if (!user || user.password !== hashPassword(password)) {
        alert('Invalid email or password');
        return;
      }
  
      // Set current user
      localStorage.setItem('currentUser', email);
  
      // Redirect to dashboard
      window.location.href = 'dashboard.html';
    });
  }
  
  // Handle dashboard initialization
  function initializeDashboard() {
    const currentUserEmail = localStorage.getItem('currentUser');
    if (!currentUserEmail) {
      window.location.href = 'login.html';
      return;
    }
  
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const currentUser = users[currentUserEmail];
  
    // Update dashboard with user info
    document.querySelector('.welcome-text').textContent = `Welcome back, ${currentUser.firstName}!`;
    document.querySelector('.user-name').textContent = `${currentUser.firstName} ${currentUser.lastName}`;
    document.querySelector('.membership-type').textContent = currentUser.membershipType;
  
    // Handle logout
    const logoutButton = document.querySelector('a[href="auth.html"]');
    logoutButton.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('currentUser');
      window.location.href = 'login.html';
    });
  }
  
  // Initialize based on current page
  function initialize() {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('signup.html')) {
      handleSignUp();
    } else if (currentPage.includes('login.html')) {
      handleLogin();
    } else if (currentPage.includes('dashboard.html')) {
      initializeDashboard();
    }
  }
  
  // Run initialization when DOM is loaded
  document.addEventListener('DOMContentLoaded', initialize);
  