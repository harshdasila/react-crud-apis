import jwt from 'jsonwebtoken';
import { config } from '../config/index.config';


export const signToken = async (userId: number): Promise<string> => {
    try {
        const jwtToken = jwt.sign({ id: userId }, config.jwt.secret, { expiresIn: '7d' });
        
        return jwtToken;
    } catch (error) {
        console.error('Error in signing JWT token:', error);
        throw new Error('Error in signing JWT token.');
    }
};
