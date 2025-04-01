Improvements to be made with more time
1. Dry up the Tailwind CSS with CVA, or something of that nature. Ideally, I'd like CSS to come from a shared, reusable module so that styling is consistent across a project.
2. SSL and auth for fetch requests. If I were using a network request to a remote server, I'd be using auth tokens in a header, and SSL certificates for security
3. Locking down artifact versions in package.json - this is often a topic for debate, but coming from the early days of React Native, I've seen how instability in shared resources can get problematic.
4. Adding a local .env file to the project for the purposes of working on a shared repo, so that accidental username and password submissions aren't made to a remote repository via checking them into .env file.