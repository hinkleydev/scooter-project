const { describe, expect, it } = require("@jest/globals");
const User = require("../classes/User.js");

describe("user.login(password)", () => {
  it("logs a user in if the password is correct", () => {
    const user = new User("James", "pa$$word", 22); // Uncrackable
    user.login("pa$$word");

    expect(user.isLoggedIn).toBeTruthy();
  });

  it("throws an error if the password is incorrect", () => {
    const user = new User("James", "pa$$word", 22);

    expect(() => { user.login("invalid") }).toThrow("Incorrect password");
  });

  it("throws an error if a user under 18 tries to register", () => {
    expect(() => {
      const user = new User("Katie", "pa$$word", 16);
    }).toThrow("Too young");
  })
});

describe("user.logout()", () => {
  it("logs a user out", () => {
    const user = new User("James", "pa$$word", 22);
    user.login("pa$$word"); // Login to logout
    user.logout();

    expect(user.isLoggedIn).toBeFalsy();
  });
});
