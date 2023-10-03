const jwt = require('jsonwebtoken');

exports.requireStudentOrAdminRole = (req, res, next) =>{
    const token = req.header('Authorization').split(' ')[1]; // "Bearer <token>"
  
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
      const userRole = decodedToken.role;
      const student_id = decodedToken.user_id
      
      
      if (userRole === 'student' || userRole === 'admin') {
        req.student_id = student_id;
        next();
      } else {
        res.status(403).json({ message: 'Access denied. Student/ Admin role required.' });
      }
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
  
exports.requirePublisherOrAdminRole = async (req, res, next) => {
   
    const token = req.header('Authorization').split(' ')[1]; 
    
    try {
   
      const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
      const userRole = decodedToken.role;
      const publisher_id = decodedToken.user_id;

      if (userRole === 'publisher' || userRole === 'admin') {
        req.publisher_id = publisher_id;
        next();
      } else {
        res.status(403).json({ message: 'Access denied. Publisher/ Admin role required.' });
      }
    } catch (error) {
      res.status(401).json({ message: 'Uauthorized' });
    }
  } 


  exports.requireAdminRoleOnly = async (req, res, next) => {
   
    const token = req.header('Authorization').split(' ')[1]; 
    
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
      const userRole = decodedToken.role;
      const publisher_id = decodedToken.user_id;
      
      if (userRole === 'admin') {
        next();
      } else {
        res.status(403).json({ message: 'Access denied. Admin role required.' });
      }
    } catch (error) {
      res.status(401).json({ message: 'Uauthorized' });
    }
  } 

