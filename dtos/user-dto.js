module.exports = class UserDto {
    id
    userId
    username
    email

    constructor(model) {
        this.id = model.id
        this.userId = model.id
        this.username = model.username
        this.email = model.email
    }
}

