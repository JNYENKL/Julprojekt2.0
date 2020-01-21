const fs = require('fs');

module.exports = {

  //Hämta en slumpad julklapp från databasen baserat på dess ID och rendera en sida med den
  generateGift: (req, res) => {


    var randItem = [];

  	// Hämta alla julklappar och rendera på index-sidan
  	db.query('SELECT * FROM items', function(err, rows, fields) {
  	  	if (err) {
          //Redirect to index page if there is an error
  	  		res.redirect("/");
          console.log("An error occured in retrieving items from database");
  	  	} else {

          //Slumpa ett tal som används som index i en array
              var size = rows.length;
              var randIndex = Math.floor(Math.random() * size);
              console.log("index: " + randIndex);

  	  		// Kolla igenom all data i tabellen
  	  		for (var i = 0; i < size; i++) {

  	  			// Skapa ett objekt för datan
  		  		var items = {
  		  			'name':rows[i].name,
  		  			'image':rows[i].image,
  		  			'link':rows[i].link,
              'descrip':rows[i].descrip,
  		  		}
  		  		// Lägg till hämtad data i en array
  		  		randItem.push(items);
  	  	}
        //Definiera ett objekt ut av alla i databasen
        let item = randItem[randIndex];

  	  	// Rendera gift.pug med ett av objekten som har index randIndex
  	  	res.render('gift.pug', {item: item, errorMessage: "Site is UP!"});
  	  	}
  	});



  },

//Rendera sidan där objekt läggs in i databasen
  getPostPage: (req, res) => {
    res.render('postGift.pug');
  },

//Metod för att lägga in i databasen
  postGift: (req, res) => {

//
      console.log('Connecting to database for postGift method');
      let name = req.body.name;
      let link = req.body.link;
      let image = req.body.image;
      let descrip = req.body.descrip;
      let password = req.body.password;

      if ( password == "passw") {
          let query = "INSERT INTO `items` (`name`, `image`, `link`, `descrip`) VALUES ('" +
              name + "', '" + image + "', '" + link + "', '" + descrip + "')";
        db.query(query, (err, result) => {
            if (err) {
                console.log('An error occured');
                return res.status(500).send(err);
            }

          res.redirect('/');
          console.log('New item added to database!');

        });
      }

      else {
        res.redirect('/');
        console.log('Wrong password entered!');
      }

  },


};
