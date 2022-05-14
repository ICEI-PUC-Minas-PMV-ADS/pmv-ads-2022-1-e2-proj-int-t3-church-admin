# Programação de Funcionalidades

## Banco de dados - SQL Server
Banco construído manualmente através de queries de criação de database e tabelas. </br>
- DB: DB_ChurchAdmin  </br>
- Tabelas: Igreja, Membro </br>

![image](https://user-images.githubusercontent.com/81825053/168447448-a48cbb1f-1eb8-4a16-a553-ff2c0895898f.png) </br>
![image](https://user-images.githubusercontent.com/81825053/168447470-61762d61-37bd-4b52-bc0a-5e888d28abaf.png)


## Back-End - API Web do ASP.NET Core
- Framework: .NET 5.0
- Models: </br>
  - Membro  - Definição dos atributos da entidade Membro 
  - Igreja  - Definição dos atributos da entidade Igreja
  
![image](https://user-images.githubusercontent.com/81825053/168447552-4bf484a8-ff36-4ed3-9f0c-d5f1b82ca48d.png)
![image](https://user-images.githubusercontent.com/81825053/168447535-0b3266be-72c7-4e41-ae3f-d062764b998f.png)

- Conexões: 
  - Sql - Classe responsável pelas transações com o banco de dados
![image](https://user-images.githubusercontent.com/81825053/168447613-dc28ee11-a9f6-4835-8fcf-101d1d24620b.png)


- Controlers: 
  - MembroController e IgrejaController - Classes responsáveis pela definição dos métodos Http utilizados na Api. </br>
![image](https://user-images.githubusercontent.com/81825053/168447721-c1f9c0ae-363f-4d1a-bd0f-064f30579a86.png)
![image](https://user-images.githubusercontent.com/81825053/168447736-24479064-10cc-4f63-b0c5-12950ea77da9.png)

        
- Métodos: </br>
  - GET/v1/ListarMembros    - Obter a lista de membros </br>
  - POST/v1/CadastrarMembro - Adicionar um novo membro </br>
  - PUT/v1/AtualizarMembro  - Atualizar um membro existente </br>
  - DELETE/v1/DeletarMembro - Excluir um membro </br>
