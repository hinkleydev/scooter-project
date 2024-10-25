const Scooter = require("./Scooter.js");
const User = require("./User.js");

class ScooterApp {
  // TODO - Update the UML to reflect that all of these are static
  
  static stations = { 
    "ONE" : [], 
    "TWO" : [], 
    "THR" : []
  };

  static registeredUsers = {};

  /**
   * Register a user in the app array
   * @param {String} username 
   * @param {String} password 
   * @param {Number}} age 
   */
  static registerUser(username, password, age) {
    const lookForUser = ScooterApp.registeredUsers[username];
    if (lookForUser != undefined) { // If a user is found
      throw "User has been registered";
    }
    const user = new User(username, password, age); // Error checking is done by the User module
    ScooterApp.registeredUsers[username] = (user);
    console.log(user.username + " has been registered");
  }

  /**
   * Log one of the users of the app in
   * @param {String} username 
   * @param {String} password 
   * @returns 
   */
  static loginUser(username, password) {
    const user = ScooterApp.registeredUsers[username];
    if (user == undefined) { // User not found in object
      throw "User not found";
    }
    user.login(password); // Error checking is done by the User module
    console.log(user.username + " has been logged in");
    return user;
  }

  /**
   * Log a user out of the app (does not remove them from the app)
   * @param {String} username 
   */
  static logoutUser(username) {
    let user = ScooterApp.registeredUsers[username];
    if (user == undefined) { // User not found in object
      throw "No such user is logged in";
    } else if (!user.isLoggedIn) { // Not logged in
      throw "User is logged out";
    }
    user.isLoggedIn = false;
    console.log(user.username + " has been logged out");
  }
  
  /**
   * Check if a station is valid, throws an error if not
   * @param {String} station 
   */
  static checkStation(station) {
    let findStation = ScooterApp.stations[station];
    if (findStation == undefined) { // If there's no station that matches
      throw "No such station";
    } 
  }

  /**
   * Creates a scooter docked at the provided station
   * @param {String} station 
   * @returns {Scooter} 
   */
  static createScooter(station) {
    ScooterApp.checkStation(station)
    let scooter = new Scooter(station);
    ScooterApp.stations[station].push(scooter);
    console.log("Created new scooter #" + scooter.serial + " created in " + station);
    return scooter;
  }
  
  /**
   * Rent a scooter out for a user, removing it from the station
   * @param {Scooter} scooter 
   * @param {User} user 
   */
  static rentScooter(scooter, user) { 
    if (scooter.user != null) {
      throw "Scooter already rented";
    }
    const location = scooter.station; // Where it's taken from
    const id = scooter.serial; // Identifying that particular one
    const stationedScooters = ScooterApp.stations[location];
    const foundScooterIndex = stationedScooters.findIndex(function(testScooter) {
      return id == testScooter.serial; // Compare the searched for ID with the one we're looking at
    });
    ScooterApp.stations[location].splice(foundScooterIndex, 1); // Delete the scooter from the station
    scooter.rent(user); // Rent it out to the user
    console.log("Scooter #" + scooter.serial + " has been rented out by " + user.username);
  }

  /**
   * Dock a scooter at the specified station
   * @param {Scooter} scooter 
   * @param {String} station 
   */
  static dockScooter(scooter, station) {
    ScooterApp.checkStation(station);
    if (scooter.station == station) {
      throw "Scooter already at station";
    }
    scooter.dock(station); // Automatically removes the user and sets the property
    ScooterApp.stations[station].push(scooter);
    console.log("Scooter #" + scooter.serial + " has been docked at " + station);
  }
  
}

module.exports = ScooterApp;
