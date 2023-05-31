var express = require("express");
var app = express();
var router = express.Router();

var path = __dirname + '/';
const PORT = 8080;
const HOST = '0.0.0.0';

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

// app.get("/cv/:fileNumber.html", function(req, res) {
//   const fileNumber = req.params.fileNumber;
//   const filePath = path.join(__dirname, "cv", `${fileNumber}.html`);
//   res.sendFile(filePath);
// });

app.use(express.static(path));
app.use("/", router);

app.listen(8080, function () {
  console.log('Aplicativo de site escutando na porta 8080!')
})
