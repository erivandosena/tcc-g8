var express = require("express");
// mail
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

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

//---- mail ----
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: 'updevops@outlook.com.br',
      pass: '12345678'
    }
  });

  const { name, email, prof, message } = req.body;

  if (!name || !email || !prof || !message) {
    return res.send("<script>alert('Por favor, preencha todos os campos obrigatórios.'); window.location='/';</script>");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.send("<script>alert('Por favor, insira um endereço de e-mail válido.'); window.location='/';</script>");
  }

  const mailOptions = {
    from: 'updevops@outlook.com.br',
    to: prof,
    cc: email,
    bcc: 'seniorfullstackdevops@gmail.com',
    subject: 'UP DevOps - Contato do Site',
    text: `Nome: ${name}\nE-mail: ${email}\nMensagem:\n${message} \n\n© UP DevOps - Todos os direitos reservados.`,
    replyTo: email
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Email sent error: ' + error);
      return res.send("<script>alert('Erro ao tentar enviar mensagem.'); window.location='/';</script>");
    } else {
      console.log('Email sent: ' + info.response);
      return res.send("<script>alert('Mensagem enviada com sucesso!'); window.location='/';</script>");
    }
  });
});
//---- mail ----

app.use(express.static(__dirname, { dotfiles: 'allow' } ));
app.listen(80, () => {
  console.log('HTTP server escutando na porta 80');
})