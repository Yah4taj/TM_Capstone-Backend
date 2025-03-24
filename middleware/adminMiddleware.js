//Ensures only admins can access certain routes


export const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};

export const adminOnly = (req, res, next) => {
    if (!req.session.user) {
      // If the user is not authenticated
      return res.status(401).json({ message: 'Not authenticated' });
    }
  
    // Check if the user has an 'admin' role
    if (req.session.user.role !== 'admin') {
      // If the user is not an admin
      return res.status(403).json({ message: 'Access denied, admin role required' });
    }
  
    
    next();
  };
  