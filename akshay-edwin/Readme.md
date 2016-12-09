
# Project Thoth
In most manufacturing sites, machines tools that have some level of automation capabilities, such as Computer Number Control or CNC for short, are operated at an individual level without the ability to optimize their performance in real-time through feedback loops or by looking at the overall production line.

### Use Case
Consider a CNC machine which breaks down if the temperature increases over 300F. Current CNC machines do have temperature sensors, but they cannot perform analytics on the historical data which results in unscheduled outages. Each outage takes 1-4 hours to restart production and may cost up to $100k. We want to build a technology solution which can leverage the sensor data from machine and provide useful information for predictive maintenance or performance optimization.

# Project components

| Name     | Description |
| --------|-------|
| Predix Machine  | This source code is built and deployed on Rasberri Pi. |
| Predix App | Source code for the web application deployed at the link |
| Alexa Predix Status | Source Code for alexa app to check the status of the Predix App|

# Architecture
[Described in video here](https://youtu.be/bUb6SnCS6ck)

# Live application 
(https://predix-machine-mit.run.aws-usw02-pr.ice.predix.io)

# Running the project
1. Follow the instructions [here](https://www.predix.io/resources/tutorials/tutorial-details.html?tutorial_id=1741&tag=1750&journey=Setup%20Raspberry%20Pi%20for%20Predix&resources=1785,1741,1742,1743) and install the Predix Machine code on Raspberri Pi
2. Download the source code PredixMachineDashboard-ES and run in Node server. 
3. For running the Alexa app follow the steps [here](https://github.com/akshaybagai/project-03/tree/master/akshay-edwin/source-code/predix-status) 
