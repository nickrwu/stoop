// Check user authentication
const checkAuth = async (req, res) => {
    console.log(req.session)
    if (req.isAuthenticated()) {
      res.json({ message: 'You made it to the secured profile' })
    } else {
      res.json({ message: 'You are not authenticated' })
    }
};