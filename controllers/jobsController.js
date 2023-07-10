import Job from '../models/Jobs.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError } from '../errors/index.js'

const createJob =  async(req, res) => {
    const {position,company} = req.body
    if(!position || !company) {
    throw BadRequestError ('pls provide all values')
    }
    // req.body.createdBy = req.user.userId
    const job =await job.create(req.body)
    res.status(StatusCodes.CREATED).JSON({Job})
}

const getAllJobs =  async(req, res) => {
    res.send('get all job')
}

const updateJob =  async(req, res) => {
    res.send('update job')
}

const showStats =  async(req, res) => {
    res.send('show stats')
}

const deleteJob =  async(req, res) => {
    res.send('delete job')
}


export { createJob, deleteJob, getAllJobs, updateJob, showStats };
