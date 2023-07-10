import jwt from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors/index.js";

const authenticateUser = async (req, res, next) => {
    // check headers
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnAuthenticatedError('Authentication Invalid')
    }
    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(payload)
        // attach the user request object
        // req.user = payload
        req.user = { userId: payload.userId }
        next();
    } catch (error) {
        throw new UnAuthenticatedError('Authentication Invalid')
    }
};

export default authenticateUser;