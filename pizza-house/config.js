const config = {
  //to send request to server
    apiUrl: "http://localhost:3000",
    generateRandomId: () => {
      return Math.random().toString(36).substr(2, 9); // Generate a random alphanumeric string
    },
    
  };
  
  module.export = config;