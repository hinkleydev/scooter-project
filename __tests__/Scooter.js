const { describe, expect, it } = require("@jest/globals");
const Scooter = require("../classes/Scooter.js");

describe("scooter.rent(user)", () => {
  it("checks a scooter out to a user", () => {
    const scooter = new Scooter("ONE");
    const user = {"username" : "default"};

    scooter.rent(user);
    expect(scooter.user).toEqual(user);
  });

  it("throws an error if battery dead or scooter broken", () => {
    const scooter = new Scooter("ONE");
    const user = {"username" : "default"};

    scooter.charge = 5;
    expect(() => { scooter.rent(user) }).toThrow("This scooter has low charge");
    
    scooter.recharge() // Recharge
    scooter.isBroken = true; // Smash it
    expect(() => { scooter.rent(user) }).toThrow("This scooter is broken");
  });
});

describe("scooter.dock(station)", () => {
  it("returns a scooter to a station", () => {
    const scooter = new Scooter("ONE");
    const user = {"username" : "default"};

    scooter.rent(user); // Rent it out
    scooter.dock("TWO"); // Put it back

    expect(scooter.user).toBeNull(); // Check they got cleared
    expect(scooter.station).toBe("TWO"); // Check it's in the right place
  });
});

describe("scooter.recharge()", () => {
  it("charges a scooter", () => {
    const scooter = new Scooter("ONE");

    scooter.charge = 10; // Discharge
    scooter.recharge(); // Recharge

    expect(scooter.charge).toBe(100);
  });
});

describe("scooter.repair()", () => {
  it("repairs a scooter", () => {
    const scooter = new Scooter("ONE");

    scooter.isBroken = true; // Hulk smash!
    expect(scooter.isBroken).toBeTruthy();

    scooter.repair(); // Immortal, forever!
    expect(scooter.isBroken).toBeFalsy();
  });
});
