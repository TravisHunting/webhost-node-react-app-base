## In this skeleton we are using server.js as the file that runs the express server and listens on server.address().port

* line **_"main": "server.js",_** added to node package.json


## cPanel creates a folder underneath public_html with the name of your node app directory.
* That is, if your app is going to start in splat.land/app-base
* a folder named "app-base" is created automatically in public_html and populated with an .htaccess file, containing the following:

```# DO NOT REMOVE. CLOUDLINUX PASSENGER CONFIGURATION BEGIN
PassengerAppRoot "/home/splatlan/app-base"
PassengerBaseURI "/app-base"
PassengerNodejs "/home/splatlan/nodevenv/app-base/14/bin/node"
PassengerAppType node
PassengerStartupFile server.js
# DO NOT REMOVE. CLOUDLINUX PASSENGER CONFIGURATION END
# DO NOT REMOVE OR MODIFY. CLOUDLINUX ENV VARS CONFIGURATION BEGIN
<IfModule Litespeed>
</IfModule>
# DO NOT REMOVE OR MODIFY. CLOUDLINUX ENV VARS CONFIGURATION END 
```

# Notes:
* PassengerAppRoot is the base folder location for the app

* Directing to an index.html: Use the absolute path as determined by the location of server.js

```
app.get('/app-base', (req, res) => {
    res.sendFile('index.html', { root: '../public_html/app-base'});
});
```

## To create the client (react) files needed for the frontend:
1. Run "npm run build" in the frontend directory. 
2. Take the files OUT of the newly created 'build' folder and place them under public_html/app-base

## To make the app run:
* Get your server.js and package.json into the folder you want to run the app out of, let's say {home}/app-base
* Using the terminal in cpanel (or ssh), navigate to this folder (home/app-base) and run npm install.

* cd client and run 'npm install' in the client directory (home/app-base/client) as well.
* "npm run build" in client dir (home/app-base/client) 
    * This creates the 'build' folder. 
    * When you created the Node app in cPanel using the 'wizard', it will have created a folder under public_html that corresponds to the application url you have chosen. (splat.land/app-base)
    * The assets from the build folder need to be placed into the public_html/app-base folder.
    * By default, the built index.html file will search for its css and js chunks in public_html/static.

    ### There are a few things you can do here to fix that. You can put your static folder under public_html instead of under public_html/app-base,
    * You can edit the src's in the built index.html file by changing:
        ```href="static/css/main.9d5b29c0.chunk.css" => href="app-base/static/css/main.9d5b29c0.chunk.css"
        src="static/js/main.66028a17.chunk.js => src="app-base/static/js/main.66028a17.chunk.js
        ```
        ... etc

    Or, better option, you can add "homepage": "app-base/", to the react package.json file.

You don't need to build the client files on the server, or even keep any of the source files on the server. You can simply put the 
built files into the public_html/app-base folder you are loading the react half of the app from.

It can be convenient to have the client folder on your webhost simply because you can then build it using the cpanel terminal / SSH and then
move the built files over to your public_html/app-base folder. (saves you from needing to use an FTP client)


# Misc Notes: 
* To resolve "Cannot GET /app/XXXX" change the urls in server.js to the full url.

* The **_"proxy": "http://localhost:40351",_** line in the react package.json doesn't seem to have any effect on the built app.
    This would make that line purely for development purposes.

https://www.a2hosting.com/kb/developer-corner/making-persistent-node.js-applications#Cron-jobs

To make the app persistent on your host, use a cron job.

Set it to run every 15 min and use flock to determine whether it is already running.

With this command, cron.lock will be generated automatically. (I think)

``` 
usr/bin/flock -n /tmp/cron.lock ${HOME}/nodejs/bin/node ${HOME}/app-base/server.js
```