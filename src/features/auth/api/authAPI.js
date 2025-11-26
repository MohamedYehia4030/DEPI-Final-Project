// src/services/authService.js
// In a real application, you would use Axios or Fetch here.

// NOTE: This is a placeholder for your actual API integration.

export const login = async (email, password) => {
  console.log(`[API Call] Attempting login for: ${email}`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800)); 
  
  // Simulate successful login
  if (email === 'user@example.com' && password === 'password') {
    return {
      id: 1,
      email: email,
      username: 'Traveler',
      token: 'jwt-token-12345', // The token is crucial for future requests
    };
  } 
  // Simulate login failure
  else if (email && password) {
    throw new Error('Invalid credentials. Please check your email and password.');
  } else {
    throw new Error('Email and password are required.');
  }
};

export const register = async (name, email, password) => {
  console.log(`[API Call] Attempting registration for: ${email}`);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Simulated successful registration response (often includes the new user object/token)
  return {
    id: 2,
    email: email,
    username: name,
    token: 'jwt-token-67890',
  };
};