Demo site: [http://ccroll.com](http://ccroll.com)

The site is built on 
<ul>
<li>Backend: node.js + socket.io + mongodb</li>
<li>Frontend: bootstrap + jquery + react.js</li>
</ul>
<p>Session uses mongodb as session store, so the site can be expanded to multiple servers.</p>

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
</ul>

<p>If you have any questions, contact me at: popman.he@gmail.com.</p>