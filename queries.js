/* Add all the required libraries*/

/* Connect to your database using mongoose - remember to keep your key secret*/

/* Fill out these functions using Mongoose queries*/
//Check out - https://mongoosejs.com/docs/queries.html

const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      Listing = require('./ListingSchema.js'),
      config = require('./config');

mongoose.connect(config.db.uri);
/* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */

var findLibraryWest = function() {
	Listing.find({name: 'Library West'}, (err, entity) => {	//find lib west and print it 
		if (err) throw err;
	
	console.log(entity);
	
	});	
};

/*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */

var removeCable = function() {
  Listing.find({code: 'CABL'}, (err, entities) => {		//find CABL
		if (err) throw err;
	
  for(let i = 0; i < entities.length; i++) {			//delete CABL document
      entities[i].remove((err) => {
        if (err) throw err;
		
	console.log(entities[i]);	//print deleted document
		});
	 }
  });  
};

/*
    Phelps Lab address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
    
    Correct Address: 1953 Museum Rd, Gainesville, FL 32603

   */

/*
    Phelps Memorial Hospital Center's address is incorrect. Find the listing, update it, and then
    log the updated document to the console.
   */

var updatePhelpsLab = function() {
  
   Listing.findOne({ "name": "Phelps Laboratory" }, 'code name address coordinates', function (err, listing) {	//find Phelps lab
    if (err) throw err;
    
	
    listing.address = "1953 Museum Rd, Gainesville, FL 32603";		//change to address
    console.log(listing)											//print changes to console
	
	listing.save(function(err) {
      if (err) throw err;

      console.log('updated Phelps Lab Address is shown above');	
    });
   });
};

/* 
    Retrieve all listings in the database, and log them to the console. 
   */

var retrieveAllListings = function() {
  Listing.find({}, (err, entities) => {
    if (err) throw err;

    for (let i = 0; i < entities.length; i++) {		//print all documents with Query adjustments
      console.log(entities[i]);
    }
  });

};

 

findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();