const express = require('express');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_TOKEN;
 
function requireStudentOrAdminRole(req, res, next) {
    const token = req.header('Authorization').split(' ')[1]; // Assuming the token is sent as "Bearer <token>"
    
    try {
      const decodedToken = jwt.verify(token, jwtSecret);
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
  
  function requirePublisherOrAdminRole(req, res, next) {
   
    const token = req.header('Authorization').split(' ')[1]; // Assuming the token is sent as "Bearer <token>"
    
    try {
    console.log(jwtSecret);
      const decodedToken = jwt.verify(token, jwtSecret);
      
      const userRole = decodedToken.role;
      const publisher_id = decodedToken.user_id;

      if (userRole === 'publisher' || userRole === 'admin') {
        req.publisher_id = publisher_id;
        next();
      } else {
        res.status(403).json({ message: 'Access denied. Publisher/ Admin role required.' });
      }
    } catch (error) {
      res.status(401).json({ message: 'Uaauthorized' });
    }
  } 


  function requireAdminRoleOnly(req, res, next) {
   
    const token = req.header('Authorization').split(' ')[1]; // Assuming the token is sent as "Bearer <token>"
    
    try {
    console.log(jwtSecret);
      const decodedToken = jwt.verify(token, jwtSecret);
      
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

  module.exports = {
    requirePublisherOrAdminRole,
    requireStudentOrAdminRole,
    requireAdminRoleOnly
  }