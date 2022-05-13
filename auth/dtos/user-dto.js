module.exports = class UserDto {
    email;
    id;
    isActivated;

    constructor(model) {
        //c onsole.log("DTO ==== model = ", model)
        this.email = model.email;
        //this.id = model._id;
        this.id = model.id;
        this.isActivated = model.isActivated;
    }
}
