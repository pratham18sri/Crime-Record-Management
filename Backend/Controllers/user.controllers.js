export const me = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
    const user = req.user;
    return res.status(200).json({ user: { firstname: user.firstname, lastname: user.lastname, username: user.username, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export default { me };
