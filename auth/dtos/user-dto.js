module.exports = class UserDto {
    ethAddress;
    id;
    username;

    constructor(model) {
        //c onsole.log("DTO ==== model = ", model)
        this.ethAddress = model.ethAddress;
        //this.id = model._id;
        this.id = model.id;
        this.username = model.username;
    }
}
