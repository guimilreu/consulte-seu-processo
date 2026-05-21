const STAFF_ROLES = ['admin', 'lawyer'];

export const requireAdmin = (req, res, next) => {
  if (!STAFF_ROLES.includes(req.user?.role)) {
    return res.status(403).json({ error: 'Acesso negado. Apenas administradores.' });
  }
  next();
};

export const isStaff = (role) => STAFF_ROLES.includes(role);
