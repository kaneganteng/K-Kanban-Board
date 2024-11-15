import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // Make a POST request to the login route "/auth/login" with user login information in JSON format
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(userInfo)
    });

    // Throw error if response status is not OK
    if (!response.ok) {
      const errorData = await response.json(); // Parse error response as JSON
      throw new Error(`Error: ${errorData.message}`); // Throw a detailed error message    
    }

    // Parse the response body as JSON
    const data = await response.json();

    return data; // Return the data received from the server
  } catch (err) {
    console.log('Error from user login: ', err); // Log any errors that occur during fetch
    return Promise.reject('Could not fetch user info'); // Return a rejected promise with an error message
  }
}


export { login }; // Export the login function to be used elsewhere in the application
