const Employee = require("./employee");

class Intern extends Employee {
    constructor (name, id, email, school, role) {
        super (name, id, email);
        this.school = school;
        this.role = role;
    }
    getRole() {
        return "Intern";
    }
    getSchool() {
        return this.school;
    }
}

module.exports = Intern;