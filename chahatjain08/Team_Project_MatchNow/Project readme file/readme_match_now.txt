# MatchNow by Chahat Jain & Shweta Agarwal


MatchNow is an intelligent image recognition system as a tool for enhancing personalized customer relationship. Top features of the tool are following:
1.	Recognize the customer as New or Existing2.	Recognize emotion of the customer entering the restaurant, allowing receptionist and table attendant to attend the customer accordingly3.	Fetch and generate all information of the customer for whom match has been found4.	Send all customer information to the table attendant assigned, enabling him/her to give food suggestions / services as per customer’s preferences
The solution will be used by a receptionist in a restaurant to identify a customer entering the restaurant. The system will identify the customer and pull historical data of the customer along with current emotion of the customer. With this information, the receptionist will be able to decide a suitable table attendant to serve this customer and share customer information with the attendant via SMS. The receptionist, after serving the customer, captures the order details of the customer in the system. The system provides the capability for the customer to enter feedback regarding service in the system that can be utilised for better service when the customer visits the restaurant next time. 

# MatchNow Setup


MatchNow is split into three separate pieces: the backend web server & database, vessel and camera hardware device, and the Web Application.  All pieces require some setup procedures.  In addition, MatchNow requires a working Wifi setup for all the components in the system. 


# Backend (Amazon Web Services and MySQL Database)

The solution AWS platform to host a web server (node js) and database (MySQL) for information storage and retrieval. The main backend file - webserver.js - is the index file of nodes server running on AWS EC2 platform.

Database consists of four Tables (refer SQL Commands Excel file for executing queries on MySQl Database hosted on AWS RDS instance).

# MatchNow Web Application (Web Interfaces)

The three web interfaces (used by receptionist, table attendant, and the customer) are stored in different UI (User Interface Folders). Each folder consists of main HTML file along with relevant CSS and Image objects used by the web interface. Simply run the required HTML page for a specific Web Interface from respective UI folder.


# Tessel Hardware Configuration (Tessel hardware server and Camera device)

The solution needs a USB supported Camera device. The device should be compatible with the tessel hardware. In our solution, Tessel acts a Web server to capture image from the camera and transmits the Image in relevant formats either to Web Application or to the Backend server.

Create a directory in the system. Connect tessel device (attached with Camera) in the system. 

Run following commands:

(a) t2 list (check whether tessel is identified by the system).
(b) t2 Wifi -n ‘<Name>’ (connects the device on Wifi network).
(c) t2 run camera.js (hosts camera node js server on vessel).

** - We need to update the Ip-address of the tessel device in ui_customer_info/ui_customer_feedback.html (Line:13).


# API configuration (account set-ups for following APIs)

The system uses following APIs and you need to update the Keys for all the APIs at respective locations in webserver.js hosted on AWS EC2 instance.

(a) Microsoft Face Detect API (https://api.projectoxford.ai/face/v1.0/detect)
(b) Microsoft Face Similar API (https://api.projectoxford.ai/face/v1.0/findsimilars)
(c) Microsoft Create FaceList API (https://api.projectoxford.ai/face/v1.0/facelists)
(d) Microsoft Add FaceList API (https://api.projectoxford.ai/face/v1.0/facelists/match_now/persistedFaces)
(e) Microsoft Emotion API (https://api.projectoxford.ai/emotion/v1.0/recognize)
(f) Amazon Web Service SNS Service for sending SMS (using AWS SDK for node js)