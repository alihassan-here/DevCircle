const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const JWT_SECRET = config.get('JWT_SECRET');
const JWT_EXPIRE = config.get('JWT_EXPIRY');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRE
    });
};
//Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);