# Plano de Testes de Software

Os requisitos para realização dos teste de software são: 

| Descrição  | 
|----------------------------------------------------------------------|
| O software precisa estar com o front-end  funcional |
| O software precisa que o back-end esteja recebendo os inputs do front-end  | 
| O software precisa que o back-end esteja armazendo os dados inputados em um banco de dados|

Os testes funcionais a serem realizados na aplicação são descritos a seguir:

|  Caso de teste | CT-01- Cadastramento de membros  |
| :------------ | :------------ |
| **Requisito Associado**  |  RF-001 O sistema deve ser capaz de cadastrar os dados dos membros da igreja |
| **Objetivo do teste**  |  Verificar se ao inputar os dados na página de cadastro, os dados são aramazenados no banco de dados |
|  **Critérios de Êxito** | O banco de dados deve conter todos os dados dr cadastro preenchidos conforme a página de cadastro  |

|  Caso de teste | CT-02- Consulta de membros  |
| :------------ | :------------ |
| **Requisito Associado**  |  RF-002 O sistema deve ser capaz de listar os dados dos membros da igreja |
| **Objetivo do teste**  |  Verificar na página de consultar, se apos o cadastro do usuário, ele foi exibido na lista |
|  **Critérios de Êxito** |O membro deve aparecer na tela com os dados preenchidos |

|  Caso de teste | CT-03- Funcionalidade do botão de visualizar  |
| :------------ | :------------ |
| **Requisito Associado**  |  RF-002 O sistema deve ser capaz de listar os dados dos membros da igreja |
| **Objetivo do teste**  | Verificar na página de consultar, se o botão de visualizar, leva a página de informações detalhadas do membro |
|  **Critérios de Êxito** |O botão deve levar a vizualização da página informaões detalhas|

|  Caso de teste | CT-04- Informações detalhadas  |
| :------------ | :------------ |
| **Requisito Associado**  |  RF-002 O sistema deve ser capaz de listar os dados dos membros da igreja |
| **Objetivo do teste**  |  Verificar na página de informações detalhadas, se todos os dados inseridos na tela de cadastro, estão devidamente preenchidos na tela de detalhes|
|  **Critérios de Êxito** |O membro deve aparecer na tela com os dados preenchidos |

|  Caso de teste | CT-05- Funcionalidade do botão de editar  |
| :------------ | :------------ |
| **Requisito Associado**  |  RF-003 O sistema deve ser capaz de atualizar os dados dos membros da igreja |
| **Objetivo do teste**  | Verificar na página de consultar, se o botão de editar, leva a página de edição |
|  **Critérios de Êxito** |O botão deve garantir a vizualização da página para editar os dados|

|  Caso de teste | CT-06- Funcionalidade do botão de deletar cadastros |
| :------------ | :------------ |
| **Requisito Associado**  |  RF-004 O sistema deve ser capaz de deletar os dados dos membros da igreja |
| **Objetivo do teste**  | Verificar na página de consultar, se o botão de deletar leva a confirmação para deletar o membro |
|  **Critérios de Êxito** |O botão deve garantir a exclusão dos dados no banco de dados e as informações de cadastro devem sumir da página de consulta|



