# CICLO 2 AWS 16 G8

### Projeto Website para Divulgação de Currículo  
Desenvolvimento de um website (html, css, imagens) contendo os currículos do grupo e a implantação de um ou mais serviços na nuvem AWS, com rede de entrega de conteúdo, com baixa latência, com segurança, e armazenamento durável, para atender a demanda de 11 milhões de requisições por mês.  

**Mentor Grupo 8**  
Rodolfo dos Santos Silva

#### KANBAN
[Quadro no gerenciamento de projeto Trello](https://trello.com/b/aZODSjkj/kanban-da-cloud)

### Gitflow
<img width=400px src="https://nvie.com/img/git-model@2x.png" alt="Gitflow">

[By Vincent Driessen | 2010 ](https://nvie.com/posts/a-successful-git-branching-model/)

### Imagem Docker
https://hub.docker.com/r/erivando/website-node


#### Certificate/TLS
```console
kubectl create secret -n website --dry-run=client tls le-updevops-tls --cert=fullchain.pem --key=privkey.pem --output yaml
```
