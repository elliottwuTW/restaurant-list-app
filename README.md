## My Restaurant List

An app for users to collect their pocket restaurants list

### Main Page

![](https://raw.githubusercontent.com/elliottwuTW/restaurant-list-app/master/project_picture.png)

### Features

Users can

- register an account with an email only
- login with email and password
- login with facebook accounts
- logout accounts
- view their own restaurants list, which includes the following information
  - restaurant picture
  - shop name
  - category
  - restaurant rating
- view a specific restaurant information in detail
- create a new restaurant
- update a specific restaurant information
- delete a specific restaurant
- filter the restaurants by searching keywords or setting the sort option

### Quick Start

```
# Create a project folder to start
mkdir <project-folder>
cd <project-folder>

# Clone the project
git clone https://github.com/elliottwuTW/restaurant-list-app.git

# Install all dependencies
npm install

# Generate the seed data
npm run seed

# Run the Express server
npm run start

# Or run the server with nodemon
npm run dev

# As the server starts successfully, the terminal will show "The server is running on http://localhost:3000".
```

### Package Versions

- Node.js : 14.4.0
- express : 4.17.1
- express-handlebars : 5.1.0
- express-session: 1.17.1
- body-parser : 1.19.0
- mongoose : 5.10.7
- method-override : 3.0.0
- bcryptjs: 2.4.3
- connect-flash: 0.1.1
- dotenv: 8.2.0
- passport: 0.4.1
- passport-facebook: 3.0.0
- passport-local: 1.0.0

### App Info

#### Author

Elliott Wu [elliottwuTW](https://github.com/elliottwuTW)

#### Version

1.2.0
