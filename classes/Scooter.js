class Scooter {
  // Static

  static nextSerial = 1; // Serial number for next created scooter

  // Default variables
  charge = 100;
  isBroken = false;
  // I made this private in the UML diagram, but in practice that won't work
  user = null;
  
  /** Create a scooter, it's automatically docked at the specified station
   * 
   * @param {String} station 
   */
  constructor(station) {
    this.station = station;
    this.serial = Scooter.nextSerial;
    Scooter.nextSerial++;
  }
  
  /**
   * Throws an error if the scooter is not charged enough or broken
   */
  #checkIfOperational() {
    if (this.charge <= 20) { // Not enough charge
      throw "This scooter has low charge";
    } else if (this.isBroken) { // Damaged
      throw "This scooter is broken";
    }
    return; // All is well
  }

  /**
   * Rent a scooter out to the user
   * @param {User} user 
   */
  rent(user) {
    this.#checkIfOperational(); // This will throw an error if it fails
    this.station = null; // Check out
    this.user = user;
  }

  /**
   * Name a location to dock the scooter to and remove the user
   * @param {String} station 
   */
  dock(station) {
    this.user = null;
    this.station = station;
  }

  /**
   * Charge scooter to 100%
   * 
   * It turns out a this.charge and this.charge() confuses JavaScript, I'll have to change the UML to reflect this
   */
  recharge() {
    this.charge = 100;
  }

  /**
   * Repair the scooter
   */
  repair() {
    this.isBroken = false;
  }
}

module.exports = Scooter;
