import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = await jwt.verify(token, 'jwt-secret-key');
    console.log(decoded);
    req.userId = decoded.id;

    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};
