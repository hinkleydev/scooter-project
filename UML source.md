To render this, please use [mermaid.live](https://mermaid.live)
```plain
classDiagram
    Scooter --o User : User
    ScooterApp --* User : registeredUsers
    ScooterApp --|> Scooter : createScooter / rentScooter
    note for Scooter "Can not operate if broken or charge < 20"
    class Scooter{
        +String/null station
        -User/null user
        +Number serial
        +Number charge
        +Boolean isBroken
        +rent(User user) void
        +dock(String station) void
        +charge() void
        +repair() void
        nextSerial() Number$
    }
    note for User "Must be over 18 to register\nIs not logged in upon registering"
    class User { 
        +String username
        -String password
        -Number age
        +Boolean isLoggedIn
        +login(String password) void
        +logout() void
    }
    class ScooterApp {
        +Object[names->station] stations
        +Object[usernames->users] registeredUsers
        +registerUser(String username, String password, Number age) User
        +loginUser(String username, String password) User
        +logoutUser(String username) void
        +createScooter(String station) Scooter
        +dockScooter(Scooter scooter, String station) void
        +rentScooter(Scooter scooter, User user) Scooter
        +print() void
    }
```