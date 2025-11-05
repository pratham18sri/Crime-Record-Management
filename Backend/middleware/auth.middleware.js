import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: 'Not authenticated' });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload?.id) return res.status(401).json({ message: 'Invalid token' });

    // If token was created for fake police id we may not have a DB user
    if (payload.id === 'police-officer') {
      req.user = { username: process.env.POLICE_ID || '2315001656', role: 'police' };
      return next();
    }

    const user = await User.findById(payload.id).select('-password');
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

export default authenticate;

export const requirePolice = (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
    if (req.user.role && req.user.role === 'police') return next();
    // Also allow pseudo police token
    if (req.user.username && (req.user.username === process.env.POLICE_ID || req.user.username === 'police-officer')) return next();
    return res.status(403).json({ message: 'Forbidden: Police only' });
  } catch (error) {
    console.error('Role check error', error);
    return res.status(403).json({ message: 'Forbidden' });
  }
};
