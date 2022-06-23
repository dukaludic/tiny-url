## What is a URL shortening system?

URL shortening system is a system that reduces the lengthy URL with parameters, queries, and even sentences, to a hash up to 10 characters long. 

## What's the main value? Who needs such a system and why?
  
The main uses are for marketing purposes, chat messages, comment sections with character count limit, and so on. 

## Describe The main mechanism of work and system components.
  
Its mechanism begins with a client sending a long URL through a front-end app that API hashes and saves in a database. That same API is waiting for GET request sent with a hash in parameters, finds the original based on the hash, and redirects the user.  

## What do you think are the main challenges in implementing and running the system
  
The main challenge here is to have a good enough algorithm that provides the best uniqueness with the least number of characters. Most hashing algorithms use time as something that impacts the hash but still... Hashing algorithm that I choose is Nano ID. Using 8 characters and 1000 hashes per hour there will be a 1% possibility of collision in 99days. If hashes collide, the next hash will be made with one character plus, so the collision is exponentially lower. The next one starts from 8 again, of course.  
  
Another challenge is to design a system catered to client's needs. What kind of tradeoff is most suitable for him. 

## Try to suggest some ideas for advanced features.
  
One of my ideas for advanced features would be statistics for premium clients. In that case, there will be more memory needed as we need to keep track of every link, even duplicate ones, to keep track of everything... Even more, if those statistics are time-sensitive, like a trending algorithm.  
  
A completely different solution would be that every URL hash expires in a day. There we would have minimal memory usage but limited functionality also.
