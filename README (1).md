
Online Learning PLatform 

This project has the potential to be a valuable tool for both the potential learners (students) and publishers. It has the ability to make education ore accessible and affordable. It can also let publishers publish/ share their knowledge with the world.

Interestingly, this platform can be used by the studnts of all ages and backgrounds who are determined to develop and enhance their professional skills.

This platform is very useful for publishers who are looking to share their knowledge with a global audience and can also earn money by making their courses accessible to the audience (with the help of an admin who holds the power to either reject or approve the publisher's courses).

The platform is handled by an admin who can approve/ reject the courses, view the potential learners and the publishers in the system etc.









## Acknowledgements

Following resources were found to be very helpful in developing this project.

1. https://nodejs.org/en/docs

2. https://www.mongodb.com/docs/

3. https://medium.datadriveninvestor.com/build-restful-api-using-nodejs-expressjs-and-mongodb-df99e18666f6

4. https://medium.com/brocoders-team/a-guide-to-the-agile-software-development-life-cycle-sdlc-11dad6f85b01


## API Reference

NA


## Appendix

NA



## Demo

Insert gif or link to demo


## Documentation

[Documentation](https://linktodocumentation)


## Features


1. Signup (asks for type of user – Student or Publisher): 
Users can create an account by providing their email, username, password, and selecting their user type (Student or Publisher).

2. Login (using JWT Authentication):
Registered users can log in using their email and password and JWT (JSON Web Token) authentication ensures secure user access.

3. Forgot Password:
Users can request a password reset by providing their registered email address.
A password reset link is sent to the user's email for account verification.

4. Change Password:
Logged-in users can change their passwords after authenticating themselves

5. Create Course:
Publishers can create multiple courses. Course details such as title, description, content, and pricing should be provided. Support for uploading course materials, videos, documents, and quizzes.

6. Profit Earned from Each Course:
Publishers can view the total amount earned from each of their published courses.

7. Update the Course:
Publishers can edit and update the content and details of their published courses.

8. View All Courses:
Students can browse and view all available courses on the platform. Courses should be categorized and searchable.

9. My Courses:
Enrolled students can access and manage the courses they've purchased. Course completion status should be available.

10. Purchase Course:
Students can purchase courses using a secure payment gateway. Points or currency should be deducted from the student's account upon purchase.

11. View Balance:
Students can view their current balance of points (or currency) left on the platform.

12.  Approve/Reject Courses of Publishers:
Admins can review and approve/reject course submissions by Publishers.Courses should meet certain quality and content standards before approval.

13. Earn Commission by Purchase of Each Course:
Admins earn a commission or fee for each course purchased, and this should be tracked and managed.

14. View Balance:
Admins can view overall profits earned by the company and transactions on the platform (which can also be added).





## Usage/Examples

Necessary Use Cases (Must be Implemented): 

1. Course browsing and enrollment: Students should be able to easily browse and enroll in courses. 

2. Instructor course creation and management: Instructors should be able to easily create their courses and Admin should be able to approve or reject the courses.

3. Payments: Students should be able to easily purchase courses (As of now we are giving promotional money to the users to purchase the courses.)

4. Revenue Generation : The portal is earning whenever a course is purchased and profits are split between the portal and the publisher.


5. Valuable Use Cases (Should be Considered):
Progress tracking and assessment: Students should be able to t


Valuable Use Cases (Should be Considered):

1. Progress tracking and assessment: Students should be able to track their progress in courses and receive feedback on their work.

2. Community features: Students and instructors should be able to interact with each other and build a community around the platform.

Deferred or Omitted Use Cases (Low Priority):

1. Redemption : The publishers will be able to withdraw their earnings to their bank account.
2. Analytics: The platform team should be able to track and analyze user behavior of users to improve the platform.



## Used By

This project is used by the following entities:
This system is designed for two primary user groups:
Students: This system is tailored for learners who seek various educational opportunities, including a wide variety of courses.
Students can use this system to explore and enroll in
courses that match their interests and educational goals. At the time of registration, they would be provided with 1000$ (dummy, which can only be used to purchase courses) to start
their learning journey.

Publishers: Publishers are individuals that create and share courses on the platform. They have the role of enriching the course catalog by offering a wide range of topics, from
academic subjects to practical skills. Publishers contribute valuable learning resources to a global audience, and they can directly earn revenue from the courses they list on the platform.
This system provides publishers with a platform to showcase their expertise and monetize their educational content.
Whenever a student purchases a course, 80% of the course fee will be credited to the Publisher’s account.

Admins are in charge of reviewing(approving/ rejecting) the courses published by the
Publishers. Admin would receive 20% of the course fee as the commission a student
purchases a course. This amount count reflects the revenue of the platform.


## Installation

Software Requirements:

● Platform: Platform independent

● Operating system: Windows 7 or above / macOS

● Tech stack: MERN, Stock.io

● Front-end tool: PostMan / React.js

● Back-end tool (web server): Node.js

● Back-end tool (web framework): Express.js

● Database: MongoDB

Hardware Requirements:

● Processor: A multi-core processor (2 GHz clock speed)

● RAM: At least 8 GB of RAM

● Storage: At least 256 GB of storage space

● Network: A high-speed internet connection