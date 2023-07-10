import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        validate: {
            validator: validator.isEmail,
            message: "Please provide valid email",
        },
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: 6,
        select: false,
    },
    lastName: {
        type: String,
        maxlength: 20,
        trim: true,
        default: "Last Name"
    },
    location: {
        type: String,
        maxlength: 20,
        trim: true,
        default: "My City"
    },

});

// hash password
UserSchema.pre("save", async function() {
    // console.log(this.modifiedPaths())
    // console.log(this.isModified('password'))

    if (!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// compare password
UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

// create jwt instance
UserSchema.methods.createJWT = function() {
    // console.log(this);
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
}

export default mongoose.model("User", UserSchema);