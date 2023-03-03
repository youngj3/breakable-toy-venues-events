# GigGuide

An app to help users locate nearby Venues and see what concerts are being played there in the near future.

[Use it here](https://breakable-toy-venues-events.herokuapp.com/)

If you don't have time to create a newUser and would like access to all features, please use the following credentials:

Email: johnDoe12@gmail.com
Password: 12345

# Features

- A user can see venues in a given US state or territory
- Navigating to a venue's page allows a user to view upcoming concerts
- Navigating to an event's page displays associted inofrmation and comments about the concert from registered users
- A user can upload and change given profile picture
- A logged in user can comment on any given event
  - Can subsequently update or delte a created comment
- A logged in user can save an event to their profile page for future viewing

## To set up:

  - Clone the repository

  - Set up your .env based on .env.example. This will require you to have an AWS, TicketMaster, and OpenAi developer accounts.

  - Run `yarn install`

  - Run `createdb breakable-toy-venues-events_development`
  
  - Run `createdb breakable-toy-venues-events_e2e`
  
  - Navigate to the server folder and run:
  
    * `yarn migrate:latest`

    * `yarn run db:e2e:migrate`

    * `yarn db:seed`

  - Navigate to the app root directory and run `yarn dev`

  - Go to `localhost:3000` in a browser to see the app!
  
  - For testing:
  
    * `yarn run dev:cypress`
    
    * Navigate to a new tab in the terminal and run `yarn e2e:open` to select a single test,
      or to run all tests at once `yarn e2e:run`

# Technologies Used: 

Front End: ReactJS, Sass, HTML

Back End: NodeJS, Express, Objection, Knex

External Libraries: Cypress, Google Maps, TicketMaster, OpenAi, faker-js, reactjs-popup

# Creator
James Young
