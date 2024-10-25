const { describe, expect, it } = require("@jest/globals");
const ScooterApp = require("../classes/ScooterApp.js");
const User = require("../classes/User.js");
const Scooter = require("../classes/Scooter.js");

describe("ScooterApp.registerUser(username, password, age)", () => {
  it("registers a new user if old enough", () => {
    const user = new User("James1", "pa$$word", 22); // Create identical object for comparison
    ScooterApp.registerUser("James1", "pa$$word", 22);

    expect(ScooterApp.registeredUsers["James1"]).toEqual(user);
  });

  it("throws an error if too young or already registered", () => {
    expect( () => {
      ScooterApp.registerUser("Kaite", "pa$$word", 16);
    }).toThrow("Too young");

    expect( () => {
      ScooterApp.registerUser("James1", "password");
    }).toThrow("User has been registered");
  });
});

describe("ScooterApp.loginUser(username, password)", () => {
  it("logs in a registered user", () => {
    const user = new User("James2", "pa$$word", 22); // Create identical object for comparison
    user.login("pa$$word"); // Sets the isLoggedIn boolean to true which we need for comparison

    ScooterApp.registerUser("James2", "pa$$word", 22);

    ScooterApp.loginUser("James2", "pa$$word");
    expect(ScooterApp.registeredUsers["James2"]).toEqual(user);
  });

  it("throws an error if user not found or password incorrect", () => {
    expect( () => {
      ScooterApp.loginUser("Invalid", "pa$$word");
    }).toThrow("User not found")

    ScooterApp.registerUser("James3", "pa$$word", 22);

    expect( () =>{
      ScooterApp.loginUser("James3", "passw0rd");
    }).toThrow("Incorrect password")
  });
});

describe("ScooterApp.logoutUser(username)", () => {
  it("logs out a registered user", () => {
    ScooterApp.registerUser("James4", "pa$$word");
    ScooterApp.loginUser("James4", "pa$$word"); // Create and log them in
    ScooterApp.logoutUser("James4"); // Log out

    expect(ScooterApp.registeredUsers["James4"].isLoggedIn).toBeFalsy();
  });

  it("throws an error if user not found", () => {
    expect(() => {
      ScooterApp.logoutUser("Invalid");
    }).toThrow("No such user is logged in");
  });
});

describe("ScooterApp.createScooter(station)", () => {
  it("creates a new scooter and adds it to ScooterApp.stations", () => {
    const scooter = new Scooter("ONE"); // Identical object for comparison
    scooter.serial++; // Increment the serial so the comparison passes
    ScooterApp.createScooter("ONE");

    const newScooter = ScooterApp.stations["ONE"][0];
    expect(newScooter).toEqual(scooter);
    scooter.serial--; // I don't think this is needed, but probably best to have anyway
  });

  it("throws an error if a station does not exist", () => {
    expect(() => {
      ScooterApp.createScooter("FAKE");
    }).toThrow("No such station")
  });
});

describe("ScooterApp.dockScooter(scooter, station)", () => {
  it("docks a scooter at a station", () => {
    let scooter = new Scooter("ONE");
    scooter.rent("Test"); // Rent it out to clear the station

    ScooterApp.dockScooter(scooter ,"TWO");
    expect(
     ScooterApp.stations["TWO"][0]
    ).toEqual(scooter);
  });

  it("throws an error if a station does not exist", () => {
    let scooter = new Scooter("ONE");
    scooter.rent("Test"); // Rent it out to clear the station

    expect( () => {
      ScooterApp.dockScooter(scooter, "FAKE");
    }).toThrow("No such station");
  });

  it("throws an error if a scooter is already at a station", () => {
    let scooter = new Scooter("ONE");
    scooter.rent("Test"); // Rent it out to clear the station

    ScooterApp.dockScooter(scooter, "TWO");
    expect( () => {
      ScooterApp.dockScooter(scooter, "TWO");
    }).toThrow("Scooter already at station");
  });
});

describe("ScooterApp.rentScooter(scooter, user)", () => {
  it("rents a scooter out to a user", () => {
    const user = new User("James5", "pa$$word");
    const scooter = ScooterApp.createScooter("TWO"); // Add it to the station list

    ScooterApp.rentScooter(scooter, user);
    expect(scooter.user).toEqual(user);
  });

  it("throws an error if a scooter is already rented", () => {
    const scooter = ScooterApp.createScooter("THR");
    const user = new User("James6", "pa$$word");
    const secondUser = new User("James7", "pa$$word");

    ScooterApp.rentScooter(scooter, user);
    expect( () => {
      ScooterApp.rentScooter(scooter, secondUser);
    }).toThrow("Scooter already rented");
  });
});
