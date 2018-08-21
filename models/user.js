let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt-nodejs');

let userSchema = new Schema({
    email: { type: String, required: true},
    password: { type: String, required: true},

});

userSchema.methods.encryptPassword = function(password)  {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

/*userSchema.methods.validPassword = (password) => {
    return bcrypt.compareSync(password, this.password);
};*/
userSchema.methods.validPassword = function(password) {
    if(this.password !== null) {
        return bcrypt.compareSync(password, this.password);
    } else {
        return false;
    }
};

module.exports = mongoose.model('User', userSchema);