class User {
  // Start here, cause everything else depends on it
  // A user by default is not logged in, calling the constructor creates an object of a user not logged in similar to putting them in a database
  
  #password; #age; // Private variables

  isLoggedIn = false;
  /**
   * Create a user object
   * @param {String} username 
   * @param {String} password 
   * @param {Number} age 
   */
  constructor(username, password, age) {
    if (age < 18) {
      throw "Too young"; // Need to be over 18
    }
    this.username = username; this.#password = password;
    this.#age = age;
  }

  /**
   * If password is correct, log user in
   * @param {String} password 
   */
  login(password) {
    if(password !== this.#password) { // If incorrect
      throw "Incorrect password";
    }
    this.isLoggedIn = true;
  }

  /**
   * Log user out
   */
  logout() {
    this.isLoggedIn = false;
  }
}

module.exports = User;
