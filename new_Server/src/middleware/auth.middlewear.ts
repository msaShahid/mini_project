import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: {
        id: string;
        name: string;
        email: string;
    }
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload & { id?: string; name?: string; email?: string };

        const { id, name, email } = decoded;

        if (!id || !email) {
            return res.status(401).json({ message: 'Invalid token payload' });
        }

        req.user = { id, name: name || '', email };
        next();
    } catch (error) {
        console.error('Auth error:', error);
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

export default authMiddleware;