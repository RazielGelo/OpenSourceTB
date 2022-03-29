# Open Source Textbook Project
## Overview
We thought of making an open source website for our project in CSTP 1206 that will be helpful to everyone specially with the students, with the help of contributors which we can call educators that will share their knowledge by adding and updating virtual books that will be available to everyone. An open source website unlike static paper textbooks, the open source textbook reflects users' experience and opinions to always improve the knowledge of people all over the world. You can take a look at [our documentation](https://docs.google.com/document/d/1_tiEi8_Zj89bupu_WBLN0ZhiwYvD9s7V4sJP7vu_QEo/edit#).

# Objective
To provide an integrated platform which is our website, where people who want to learn and gain knowledge that can be useful not only in their school life but also outside of it and people who love to share their knowledge but are unable because of the lack of platforms that they can use and contribute freely. These virtual books are free for anyone to read, update and publish.

**#How To Run**
1. Create a new folder and give a name
2. Open the CMD command and go to the folder
3. Type in "git clone <Github repository link>"
4. Go to the github folder
5. Type in "npm i"
6. Run the folder by type in "npm run dev"
  
#Project Structure
Folder:
  Middfleware: Contains the passport.js
  prisma: Contains the database structure and its relationship
  public: Contains all CSS, JS, and SASS
  routes: Contains book.js, user.js, and index.js
  views: Contains all design of the website in pug files

Files:
  .env: Contains secret codes such as database links
  index.js: Contains codes that initializes the website and libraries 
  package.json: Contains scripts that's used to run the website and other package dependencies
  
