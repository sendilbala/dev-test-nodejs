import express from 'express';
import authenticate from '../api/authenticate';


export default  async (req:express.Request, res: express.Response, next: express.NextFunction) => {
    
    // check for basic auth header
    if (!req.headers.authorization ) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
    } 

    // verify auth credentials
   const base64Credentials =  req.headers.authorization;

   const [username, password] = Buffer.from(base64Credentials.split(' ')[1], 'base64')
      .toString()
      .split(':');


    const authenticated = await authenticate(username, password);

    if (!authenticated) {

      
        return res.status(401).json({ message: 'Invalid Authentication Credentials' });
    }


    next();
}