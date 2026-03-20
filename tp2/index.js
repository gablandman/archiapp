var express = require('express');
var app = express();

// servir les fichiers statiques du client
app.use(express.static('public'));

// cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// exo 2.1-2.2 - route test
app.get('/test/*', function(req, res) {
    var contenu = req.url.substring(6);
    contenu = unescape(contenu);
    res.json({ msg: contenu });
});

// exo 2.3 - compteur
var compteur = 0;

app.get('/cpt/query', function(req, res) {
    res.json({ cpt: compteur });
});

app.get('/cpt/inc', function(req, res) {
    var v = req.query.v;
    if (v === undefined) {
        compteur++;
        res.json({ code: 0 });
    } else if (String(v).match(/^-?\d+$/)) {
        compteur += parseInt(v);
        res.json({ code: 0 });
    } else {
        res.json({ code: -1 });
    }
});

// exo 2.4 - microservice de messages
var messages = [];

app.get('/msg/post/*', function(req, res) {
    var msg = req.url.substring(10);
    msg = unescape(msg);
    messages.push(msg);
    res.json({ id: messages.length - 1 });
});

app.get('/msg/get/:id', function(req, res) {
    var id = parseInt(req.params.id);
    if (id >= 0 && id < messages.length && messages[id] !== null) {
        res.json({ code: 1, msg: messages[id] });
    } else {
        res.json({ code: 0 });
    }
});

app.get('/msg/getAll', function(req, res) {
    var result = [];
    for (var i = 0; i < messages.length; i++) {
        if (messages[i] !== null) {
            result.push({ id: i, msg: messages[i] });
        }
    }
    res.json(result);
});

app.get('/msg/nber', function(req, res) {
    var count = 0;
    for (var i = 0; i < messages.length; i++) {
        if (messages[i] !== null) count++;
    }
    res.json({ nber: count });
});

app.get('/msg/del/:id', function(req, res) {
    var id = parseInt(req.params.id);
    if (id >= 0 && id < messages.length && messages[id] !== null) {
        messages[id] = null;
        res.json({ code: 1 });
    } else {
        res.json({ code: 0 });
    }
});

// demarrage
var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log("serveur demarre sur le port " + port);
});
