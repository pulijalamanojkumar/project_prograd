const mongoose = require("mongoose"),
	audi = require("./models/audi"),
	screening = require("./models/screening"),
	reservation = require("./models/reservation"),
	movies = require("./models/movies");




var data = [
	{
		name: "The Wailing",
		img: "https://m.media-amazon.com/images/M/MV5BODkwMTgxNjA2NF5BMl5BanBnXkFtZTgwMDc0OTcwOTE@._V1_.jpg",
		summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet quam augue. Integer dignissim orci risus, in sodales mi vehicula id. Fusce sodales nisi dui, at egestas sem euismod in. Etiam dignissim eros quis tellus lobortis lobortis. Cras pellentesque orci sit amet metus vehicula faucibus. Praesent a tempor ligula. Vivamus eu pellentesque lorem. Duis varius non felis ac iaculis. Morbi placerat, libero a iaculis sagittis, felis eros malesuada quam, ut hendrerit mi eros quis ante. Mauris ultricies augue magna, vitae dignissim dui fermentum nec. Cras vel sem vehicula, sodales odio in, placerat nisl. In efficitur purus sapien, sit amet elementum eros molestie nec. Nulla id congue quam. Integer mollis lacus a dolor semper rhoncus. Aenean mauris arcu, pharetra in risus in, accumsan vestibulum purus. Mauris eu mauris faucibus, mattis augue aliquam, euismod quam.",
		ratings: "4.8",
		director: "Darren",
		release: "2016",
		duration: 120

	},
	{
		name: "Miss Bala",
		img: "data:image/jpeg;base64,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",
		summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet quam augue. Integer dignissim orci risus, in sodales mi vehicula id. Fusce sodales nisi dui, at egestas sem euismod in. Etiam dignissim eros quis tellus lobortis lobortis. Cras pellentesque orci sit amet metus vehicula faucibus. Praesent a tempor ligula. Vivamus eu pellentesque lorem. Duis varius non felis ac iaculis. Morbi placerat, libero a iaculis sagittis, felis eros malesuada quam, ut hendrerit mi eros quis ante. Mauris ultricies augue magna, vitae dignissim dui fermentum nec. Cras vel sem vehicula, sodales odio in, placerat nisl. In efficitur purus sapien, sit amet elementum eros molestie nec. Nulla id congue quam. Integer mollis lacus a dolor semper rhoncus. Aenean mauris arcu, pharetra in risus in, accumsan vestibulum purus. Mauris eu mauris faucibus, mattis augue aliquam, euismod quam.",
		ratings: "4.5",
		director: "Micheal",
		release: "2018",
		duration: 90
	},
	{
		name: "Godzilla",
		summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet quam augue. Integer dignissim orci risus, in sodales mi vehicula id. Fusce sodales nisi dui, at egestas sem euismod in. Etiam dignissim eros quis tellus lobortis lobortis. Cras pellentesque orci sit amet metus vehicula faucibus. Praesent a tempor ligula. Vivamus eu pellentesque lorem. Duis varius non felis ac iaculis. Morbi placerat, libero a iaculis sagittis, felis eros malesuada quam, ut hendrerit mi eros quis ante. Mauris ultricies augue magna, vitae dignissim dui fermentum nec. Cras vel sem vehicula, sodales odio in, placerat nisl. In efficitur purus sapien, sit amet elementum eros molestie nec. Nulla id congue quam. Integer mollis lacus a dolor semper rhoncus. Aenean mauris arcu, pharetra in risus in, accumsan vestibulum purus. Mauris eu mauris faucibus, mattis augue aliquam, euismod quam.",
		img: "https://images.moviesanywhere.com/15ed376bdf6d3340622836f2cf6329f3/ccf1b993-b28a-4a0e-b5e6-51f5c7278fd2.jpg",
		ratings: "3.8",
		director: "Kim yong",
		release: "2018",
		duration: 90
	},
	{
		name: "Avengers Endgame",
		summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet quam augue. Integer dignissim orci risus, in sodales mi vehicula id. Fusce sodales nisi dui, at egestas sem euismod in. Etiam dignissim eros quis tellus lobortis lobortis. Cras pellentesque orci sit amet metus vehicula faucibus. Praesent a tempor ligula. Vivamus eu pellentesque lorem. Duis varius non felis ac iaculis. Morbi placerat, libero a iaculis sagittis, felis eros malesuada quam, ut hendrerit mi eros quis ante. Mauris ultricies augue magna, vitae dignissim dui fermentum nec. Cras vel sem vehicula, sodales odio in, placerat nisl. In efficitur purus sapien, sit amet elementum eros molestie nec. Nulla id congue quam. Integer mollis lacus a dolor semper rhoncus. Aenean mauris arcu, pharetra in risus in, accumsan vestibulum purus. Mauris eu mauris faucibus, mattis augue aliquam, euismod quam.",
		img: "https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810",
		ratings: "4.5",
		director: "Ruso Brothers",
		release: "2019",
		duration: 200
	},

];
var th = [
	{
		name: "audi1",

		showTimes: [
			{
				start: 9,
				end: 12,
				available: true
			},
			{
				start: 12,
				end: 15,
				available: true
			},
			{
				start: 15,
				end: 18,
				available: true
			},
			{
				start: 18,
				end: 21,
				available: true
			}
		]
	},
	{
		name: "audi2",

		showTimes: [
			{
				start: 9,
				end: 12,
				available: true
			},
			{
				start: 12,
				end: 15,
				available: true
			},
			{
				start: 15,
				end: 18,
				available: true
			},
			{
				start: 18,
				end: 21,
				available: true
			}
		]
	},
	{
		name: "audi3",

		showTimes: [
			{
				start: 9,
				end: 12,
				available: true
			},
			{
				start: 12,
				end: 15,
				available: true
			},
			{
				start: 15,
				end: 18,
				available: true
			},
			{
				start: 18,
				end: 21,
				available: true
			}
		]
	}


]


 module.exports=function seed() {

	movies.deleteMany({}, function (err, res) {
		if (err)
			console.log(err)
		else
			console.log(res);
	});
	data.forEach(function (movie) {
		movies.create(movie, function (err, added) {
			if (err)
				console.log(err);
			else
				console.log(added);
		});

	});
	movies.updateMany({}, { $set: { "screening": false } }, function (err, Movies) {


		if (err)
			console.log(err);
		else
			console.log(Movies);

	});
	audi.deleteMany({}, function (err, res) {
		if (err)
			console.log(err)
		else
			console.log("deleted");
		th.forEach(function (th) {

			audi.create(th, function (err, newaudi) {
				if (err)
					console.log(err);
				else
					console.log("new audi created");
			});
		});

	});

	screening.deleteMany({}, function (err, res) {
		if (err)
			console.log(err);
		else
			console.log("All screens deleted");
	});

	reservation.deleteMany({}, function (err, res) {
		if (err)
			console.log(err);
		else
			console.log("all reservations deleted");
	});

	
}


