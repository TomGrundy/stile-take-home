# Take home assessment for Stile

### Author: Thomas Grundy

### Short description of approach taken
- I am spinning up an Express server, written in Typescript, and using Mongo to persist the processed xml, as given this was meant to take 3 hours, that seemed like the path of least resistance for me on this, but ideally we'd be using some columnar DB layer, as this feels more structured than something calling for the more loosy-goosy nature of Mongo.
- I've followed what is a pretty standard CRUD app MVC layout for the folder structure, and also initially threw it all in a `backend` folder as I thought I might try and wow you with some react frontend of the aggregate data, but I'd rather get this done in the time-box set out then faff about any longer 🤣.
- The code uses Mongoose and Joi to do validation on the data before storing it in the DB, which also gives me the benefit of being able to cleanly reject malformed inputs, as requested in the doc outlining what you wanted from me.
- I've used Jest and Supertest in order to mock out functionality and write some tests to ensure the code coverage of the different paths our endpoints can take are covered.

### Anything I'd like to draw particular attention to
- Requirements didn't mention standard deviation in the `/aggregate` response, but the example output did, so may as well chuck it in. Also worth noting I used a math library for this instead of hand-rolling my own solutions, as any language worth it's weight should have that stuff in its standard library anyways, or at least have a package that is road
tested enough that it hopefully doesn't leftpad your project into security hell.
- I'm returning `418 I'm a teapot` for if validation on the input fails, as the doc mentions needing to physically print out stuff if the input is corrupted or invalid in some way, and I thought the weird joke 400-level response would fit that requirement. But in the real world you'd use some non-nonsensical error response.

### How to build/run
If you don't have NPM, I suggest getting it via NVM, which lets you switch out versions of node/npm in case you need to run some older version for one project vs another.
Check it out at https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating , and check out how you install it. Just pipe that raw curl into bash, nothing can go wrong!

- `npm install` should install dependencies.
- `npm run build` will compile up all that Typescript goodness.
- `npm start` runs the server, allowing you to hit it up with Postman or CURL or whatever the cool kids are using nowadays to send stuff at a server.
- `npm test` should run the tests, which should all pass unless I've introduced some non-deterministic bug I've missed, but everytime I ran them they passed! "Works on my machine", he says, before it then immediately explodes 🤞.

Or, you know, use the docker-compose file included in the dir and just run it in docker and then curl your heart away.

Please let me know if you need anything further from me! you can reach me at hireme@thomasgrundy.com.