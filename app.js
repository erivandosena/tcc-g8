var express = require("express");
var app = express();
var router = express.Router();

var path = __dirname + '/';

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

app.use(express.static(path));
app.use("/", router);

app.use(express.static(__dirname, { dotfiles: 'allow' } ));
app.listen(80, () => {
  console.log('HTTP server escutando na porta 80');
})