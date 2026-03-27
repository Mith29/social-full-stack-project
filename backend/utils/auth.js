import jwt from "jsonwebtoken";


const secret = process.env.JWT_SECRET

export function authMiddleware(req, res, next) {
   try {let token = req.headers.authorization
//check if theres a token
if(!token){
    return res.status(401).json({message: "No token provided!"})
}

//remove the 'Bearer' part of token
token = token.split(' ').pop().trim();

//verify the token
const { data } = jwt.verify(token,secret)


//pass the payload from the token to the req objwct
req.user = data
//move on to the route
next()}catch(err){
    console.log(err.message);
    res.status(400).json({message: err.message})
}

}



