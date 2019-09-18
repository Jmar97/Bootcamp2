'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
const fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Connect to your database using mongoose - remember to keep your key secret*/

mongoose.connect(config.db.uri);

//see https://mongoosejs.com/docs/connections.html
//See https://docs.atlas.mongodb.com/driver-connection/

/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
  //see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

  Remember that we needed to read in a file like we did in Bootcamp Assignment #1.
 */
 
 fs.readFile('listings.json', (err, data) => {
  if (err) throw err;

  const lines = JSON.parse(data).entries;
  var listing_data;
  for (let i = 0; i < lines.length; i++) {
    listing_data = new Listing(lines[i])
      .save((err, listing) => {
		if (err) throw err;


        if (i == lines.length - 1) {	//check same type to see if end of file is found
          console.log('Finished Transfer');

          process.exit(0);		//exit when end is reached
        }
      });
  }

});


/*  
  Check to see if it works: Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */