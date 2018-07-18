class Config{
	
	constructor(app){
		// Setting .html as the default template extension
		app.set('view engine', 'html');

		// Initializing the ejs template engine
		app.engine('html', require('ejs').renderFile);

		// Telling express where it can find the templates
		app.set('views', (__dirname + '/../views'));

		//Files 
		const a = require('path').join('public_data');
		
		console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> '+a);
		// app.use(require('express').static(require('path').join('public_data')));
		app.use(require('express').static(__dirname + '/../public_data'));
		// app.use(express.static(__dirname + '/public'));

	}
}
module.exports = Config;