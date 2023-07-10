import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

const JobsSchema =  new mongoose.Schema({
        company: {
        type: String, 
        required: [true, 'please provide company'],
        minlength: 3,
        maxlength: 20,
       
},
        position: {
        type: String, 
        required: [true, 'please provide position'],
        minlength: 3,
        maxlength: 20,
},
        status: {
        type: String,
        enum: ['interview', 'declined','pending'],
        default: 'pending'
},
        jobType: {
        type: String,
        enum: ['part-time', 'full-time','intern'],
        default: 'fu-time'
},
       jobLocation: {
        type: String,
        default: 'my city',
        required: true
},
        createdBy: {
        type:mongoose.Types.ObjectId,
        ref:'User',
        required: [true, 'please provide user']

        }
},
{timestamps: true}
)


export default mongoose.model('Job', JobsSchema)