const express = require('express');
const path = require('path');

const app = express();
const port = 3000;
const lib_files = [ 'pexxalert.min.css', 'pexxalert.umd.min.js' ];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/' || '/index.html', function(req, res) {
	res.render('index.html');
});

app.get('/lib/:file', function(req, res) {
	if (!req.params.file) return res.status(501).json({ message : 'File not found' });
	if (!lib_files.includes(req.params.file)) return res.status(501).json({ message : 'File not found' });
	res.sendFile( path.resolve(__dirname + '../../src_min--minified/' + req.params.file) );
});

app.listen(port, function() { console.log(`PexxAlert demo app listening on port ${port}`);
});
