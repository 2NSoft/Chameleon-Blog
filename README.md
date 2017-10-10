# Chameleon-Blog
Telerik Front-end Final Project

The goal of the project is to build a blog SAP, based on the Chameleon design

## Front-end
  The app has been developed without any frameworks. Uses Navigo as a router.
  
## Back-end
  Self made NodeJS Server, based on Express. Passport has been used for user authentication. The server exposes a RESTFull API as follows:
  
  ### /api/v1/auth
    - GET returns the current authentication status.
    - POST signes in the user
    - DELETE signes out the user
  ### /api/v1/users
    - GET returns all usernames
    - GET?id returns the user info including all posts by that user
    - POST registers new user
  ### /api/v1/posts
    - GET returns all posts
    - GET?random returns N random posts
    - POST creates a new post
  ### /api/v1/categories
    - GET returns all categories
    - GET?id returns the category info including all posts in that category 
  ### /api/v1/quotes
    - GET returns all quotes
    - GET?random returns N random quotes
  ### /api/v1/lists
    -GET returns various list based on
      ?type= returns the 6 most recent items of the following types: quotes, posts, comments, text;
        where posts returns post titles and text returns only one post text
      ?type='type'&random=N returns N random items of that type
  
