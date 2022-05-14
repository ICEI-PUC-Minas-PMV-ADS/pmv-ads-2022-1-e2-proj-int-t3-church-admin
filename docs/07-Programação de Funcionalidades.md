# Programação de Funcionalidades

## Banco de dados - SQL Server
Banco construído manualmente através de queries de criação de database e tabelas. </br>
- DB: DB_ChurchAdmin  </br>
- Tabelas: Membro, Igreja </br>


## Back-End - API Web do ASP.NET Core
- Framework: .NET 5.0
- Models: </br>
  - Membros  - Definição dos atributos da entidade Membro 
  - Igreja  - Definição dos atributos da entidade Igreja
- Conexões: 
  - Sql - Classe responsável pelas transações com o banco de dados
- Controlers: 
  - MembroController e IgrejaController - Classes responsáveis pela definição dos métodos Http utilizados na Api.
          
- Métodos: </br>
  - GET/v1/ListarMembros    - Obter a lista de membros </br>
  - POST/v1/CadastrarMembro - Adicionar um novo membro </br>
  - PUT/v1/AtualizarMembro  - Atualizar um membro existente </br>
  - DELETE/v1/DeletarMembro - Excluir um membro </br>
