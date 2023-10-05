# Online-Learning-Platform



## About the Online Learning Platform

The Online Learning Platform is a powerful educational tool with the potential to benefit both students and publishers. It aims to enhance accessibility and affordability in education while providing students with access to a diverse range of courses from various publishers. 

### For Students
This platform is designed for learners of all ages and backgrounds, offering a wide array of courses spanning academic subjects to practical skills. It caters to those seeking personal or professional development opportunities.

### For Publishers
Publishers, whether experts or enthusiasts, can leverage this platform to share their knowledge and expertise globally. They can create and publish courses, earning a percentage of the revenue from each course enrollment.

### Entities Involved
- **Student**: Enrolls in courses to learn and grow.
- **Publisher**: Publishes courses and earns from teaching.
- **Admin**: Approves courses and contributes to the platform's success.

### Target Audience
Our platform serves students who are eager to acquire new knowledge and publishers willing to share their valuable experiences through a blend of theory and practical labs, all while securing a source of income for a lifetime.


​
​
# This README will guide you through the steps to set up and run the project locally.

## Getting Started

1. Clone the main branch of the GitHub repository:

   git clone https://github.com/ashishfatnani/Online-Learning-Platform.git online-learning-project

2. Open your favorite code editor (e.g., VSCode) and navigate to the root directory of the online-learning-project.

   Install project dependencies by running: npm install
   
3. After successfully installing the node_modules, you can start the project's Node.js server by running:

	node server.js

4. This command will launch the server, and you should see a message indicating that the server is running successfully.



​
​

## API Reference:


1) Registration API 

For the demonstration we are taking registration of a publisher.

URL - http://localhost:8000/api/publisher/registerPublisher


Request body - 

{
    "firstName": "firstName_of_publisher",
    "lastName": "lastName_of_publisher",
    "email": "email_of_publisher@domain",
    "password": "password_of_publisher",
    "confirmPassword": "password_of_publisher",
    "role": "publisher"
}



The above API creates a publisher in the DB.


2) Login API 

For the demonstration we will be logging in the publisher.

URL - http://localhost:5000/api/v1/login/publisher

Request body: 

{
    "email": "email_of_publisher@domain",
    "password": "password_of_publisher"
}


Upon successful login of the publisher, this API generates a JWT Token in the response(say "xxyyzz").



3) Create Course

Now we will be creating a course. It is to be noted that Create API is authorised to be used by publishers only, so to access this API, we will be providing the JWT token (generated above) to Bearer Token Authentication.


URL - http://localhost:8000/api/courses/publishCourse

Request Body:

{
    "course_title": "AP",
    "course_description": "An intermediate course for AP",
    "course_price": 500,
    "course_content": {
        "modules":{
            "C1": "Content of module 1",
            "C2": "Content of module 2",
            "C3": "Content of module 3"

        },
        "quizzes": {
            "Q1": "Quiz of module 1",
            "Q2": "Quiz of module 2",
            "Q3": "Quiz of module 3"
        },
        "Assignments": {
            "A1": "Assignment of module 1",
            "A2": "Assignment of module 2",
            "A3": "Assignment of module 3"
        }
    }
    
}



Authorization: Token - "xxyyzz".

The successful invokation of this API will create a course in the DB.


Similarly, you can refer to the Postman Collection in the project.


Accessibility.


Endpoint             											Authored Users 

Create Course        											Publishers/ Admin 

Approve Course/ Reject Course 	    							Admin Only 

View Pending courses(The courses with status Pending) 			Admin Only

Purchase Course 												Student/ Admin

Get All Courses 												Publishers/ Admin

Get All Students 												Admin Only 

Get All Publishers 												Admin Only 

Change Profile 													User Specific( User must log in with their Tokens)

Get All Courses 												Students/ Admin 

Get My courses 													Students/ Admin

Update Course													Publishers/ Admin

Get Approved/ Pending/ Rejected Courses 						Publishers/ Admin

Get Single Course												Students/ Admin 




​
## Acknowledgements
​
Following resources were found to be very helpful in developing this project.
​
1. https://nodejs.org/en/docs
​
2. https://www.mongodb.com/docs/
​
3. https://medium.datadriveninvestor.com/build-restful-api-using-nodejs-expressjs-and-mongodb-df99e18666f6
​
4. https://medium.com/brocoders-team/a-guide-to-the-agile-software-development-life-cycle-sdlc-11dad6f85b01
​

​
## Contributing

We welcome contributions from developers like you to make this project a standout in the EdTech market! Whether you want to report issues, suggest improvements, or submit your own enhancements, your input is valuable.

### How to Contribute

1. Fork the repository to your GitHub account.
2. Clone the forked repository to your local machine.
3. Create a new branch for your contributions:
4. Commit your changes and raise a Pull Request(adding the reviewers - ashishfatnani, RahulDusajeFSD, prgyakapur)

Thank you !!
   
   
