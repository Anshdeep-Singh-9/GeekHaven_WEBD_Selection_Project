import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    progress:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],
    bookmarks:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }]
    
}, { timestamps: true });

async function hashPassword(Password) {
  const salt = 10;
  const hashedPassword = await bcrypt.hash(Password, salt);
  return hashedPassword;
}

userSchema.statics.signupUser = async function (name, email, password){
    console.log("You are in signupUser method");
    if (!email || !password || !name) {
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email not valid')
    }

    const exists = await this.findOne({ email });
    console.log(exists);

    if (exists) {
        throw Error('Email already in use')
    }

    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword);
    const user = await this.create({ name, email, password: hashedPassword});

    return user
}

userSchema.statics.loginUser = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email not valid')
    }   

    const user = await this.findOne({ email });
    if (!user) {
        throw Error('Incorrect email')
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error('Incorrect password')
    }   

    return user;
}

const User = mongoose.model("User", userSchema, "users");

export default User;
