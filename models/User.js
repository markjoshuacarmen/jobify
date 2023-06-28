import mongoose from 'mongoose';
import validator from 'validator';

const UserSchema =  new mongoose.Schema({
        name: {
        type: String, 
        required: [true, 'please provide name'],
        minlength: 3,
        maxlength: 20,
        trim: true,
       
},
        email: {
        type: String, 
        required: [true, 'please provide email'],
        validate: {
            validator: validator.isEmail,
            message:'please provide a valid email'
        },
        unique: true,

},
        password: {
        type: String, 
        required: [true, 'please provide password'],
        minlength: 6,
},
        
        lastName: {
        type: String, 
        required: [true, 'please provide name'],
        maxlength: 20,
        trim: true,
        default: 'lastName'
},
        location: {
        type: String, 
        maxlength: 20,
        trim: true,
        default: 'my city',
},
})

export default mongoose.model('User', UserSchema)