##### Demo site: [http://neohe.com](http://neohe.com)
###### Donation: 1ANFLKVy37ZMnbzhYHEqhgHcxEbFnQh7kE

The site is built on 
<ul>
<li>Backend: node.js + socket.io + mongodb</li>
<li>Frontend: bootstrap + jquery + react.js</li>
</ul>

<p>Before you run this site, please set up connection to mongodb in config/developement.js or production.js.</p>

<ul>
<li>2015-02-24:  First commit; Basic features added.</li>
<li>2015-03-11:  Add chat functionality. Chat messages can be saved to database and kept for a week(using mongodb TTL index).</li>
<li>2015-03-18:  Get bitcoin address from Blockchain.info and can be saved to user account.</li>
<li>2015-03-21:  Update balance for deposit every 30 seconds once BTC address is generated; 
				 User name has to be unique(using unique index of mongodb);
<li>2015-03-22:  Bitcoin faucet implemented. Use google reCaptcha to verify user is not rebot. <br />
	             Amount of faucet and interval can be adjusted in config file.</li>
<li>2015-03-29:  Move to ubuntu and use nginx as web server.</li>
<li>2017-01-25:  Start rewriting in ES6 and react. Use babel to transform ES6 to ES5. Node.js acts as restful api/socket.io server and does not render front-end html any more. Will use docker to host application in the future.</li>
<li>2017-04-07:  Use docker containers to deploy a working beta.</li>
<li>2018-01-21:  Add user management, forget pasword, country blocker, 2FA, back office and more features. Send me email for back office access.</li>
</ul>
<p>The whole site uses three docker containers. One is for front-end, hosted by nginx images. The second one is for back-end, hosted by node 7.8 and socket.io. The third one is using mongo db images. You can see three containers in docker-compose.yml.  </p>
<h4>How to setup the site? </h4>
<strong>NOTE: If you are on windows to build docker container, read below before setting up the site.</strong>
<p>Before step 1, you may need to disable IIS or change the port mapping of <strong>web</strong> section in docker-compose.yml. eg. <pre>80:80 -> 8080:80</pre> </p>
<p>Before step 3, you may need to open up docker settings and set the share drive. And may need to comment out volumes for mongo in docker-compose.yml<br />
	<pre>
	volumes:
      - ./mongodb/db:/data/dbvolumn
      </pre>
</p>
<h4>Steps:</h4>
<ol>
<li>Install node.js and npm</li>
<li>Install docker</li>
<li>Go to the root folder of source code where docker-compose.yml resides.</li>
<li>Build client:<strong> cd client && npm run prod && cd ..</strong></li>
<li>Build server:<strong> cd server && npm run prod && cd ..</strong></li>
<li>docker-compose build</li>
<li>docker-compose up -d</li>
<li>Open browser: http://localhost</li>
</ol>
<p>Or just run <strong>build.bat</strong>. It does steps 3-6 for you.<p>
<h4>How to update the site? </h4>
<p>The physical files are not actually in the containers, as you can see volumes in each section of docker-compose.yml. volumes maps host path to the internal path of container. So you just need to update files in host. After you test and build your local souce code by using <strong>npm run prod</strong> for client or server, push the changes to github. Then in your host machine, just type <strong>git pull</strong> and get the changes from github. That's it. You update you site. </p>
<p>If you have any questions, contact me at: popman.he@gmail.com.</p>
