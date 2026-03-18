# ☕ Coffee Shop Fullstack

## 🎯 Sobre o Projeto

Este projeto é feito para a disciplina de Banco de Dados, curso Engenharia da Computação, UFPB. Consiste em uma aplicação fullstack para uma loja de café. A primeira parte do trabalho foca na implementação de um **CRUD (Create, Read, Update, Delete)** completo para a tabela de **usuários**, incluindo a gestão de dados de autenticação e autorização. O objetivo é consolidar e utilizar conceitos e tecnologias relacionadas a Banco de Dados. 

## 🚀 Tecnologias Utilizadas

O backend foi desenvolvido utilizando as seguintes tecnologias e bibliotecas:

*   **Node.js**: Ambiente de execução JavaScript assíncrono e orientado a eventos.
*   **Express**: Framework web para Node.js, utilizado para construir a API RESTful.
*   **Sequelize**: ORM (Object-Relational Mapper) para Node.js, facilitando a interação com o banco de dados PostgreSQL.
*   **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional.
*   **bcryptjs**: Biblioteca para hash de senhas, garantindo a segurança das credenciais dos usuários.
*   **jsonwebtoken**: Implementação de JSON Web Tokens (JWT) para autenticação e autorização.
*   **dotenv**: Módulo para carregar variáveis de ambiente de um arquivo `.env`.


## 👥 CRUD de Usuários (Backend)

A funcionalidade de CRUD de usuários é implementada através de um modelo Sequelize, um controlador e rotas de API dedicadas.

### Model de Usuário (`src/models/UserModel.js`)

O modelo `User` define a estrutura da tabela de usuários no banco de dados, incluindo validações e hooks para hash de senha. Os campos são:

*   **`name`**: Nome do usuário (String, obrigatório, entre 3 e 255 caracteres).
*   **`email`**: E-mail do usuário (String, obrigatório, formato de e-mail válido, único).
*   **`password_hash`**: Hash da senha do usuário (String, gerado automaticamente).
*   **`password`**: Senha (Virtual, utilizada para validação e geração do hash, entre 8 e 60 caracteres).
*   **`role`**: Papel do usuário (ENUM: 'admin', 'client', padrão: 'client').

Um hook `beforeSave` é utilizado para gerar o `password_hash` a partir da `password` fornecida, utilizando `bcryptjs`.

### Controller de Usuário (`src/controllers/UserController.js`)

O `UserController` contém a lógica para cada operação CRUD:

*   **`create(req, res)`**: Cria um novo usuário com base nos dados fornecidos no corpo da requisição. Realiza validações e retorna o usuário criado (com `id`, `name`, `email`, `role`).
*   **`read(req, res)`**: Retorna uma lista de todos os usuários cadastrados (com `id`, `name`, `email`, `role`).
*   **`readOne(req, res)`**: Retorna um único usuário com base no `id` fornecido nos parâmetros da rota (com `id`, `name`, `email`, `role`). Retorna erro 400 se o usuário não for encontrado.
*   **`update(req, res)`**: Atualiza um usuário existente com base no `id` e nos dados fornecidos. Retorna o usuário atualizado.
*   **`delete(req, res)`**: Exclui um usuário com base no `id` fornecido. Retorna status 200 em caso de sucesso.

### Rotas da API (`src/routes/UserRoutes.js`)

As rotas da API para o CRUD de usuários são definidas em `src/routes/UserRoutes.js`:

| Método HTTP | Rota           | Descrição                       | Controlador             |
| :---------- | :------------- | :------------------------------ | :---------------------- |
| `POST`      | `/user`        | Cria um novo usuário            | `UserController.create` |
| `GET`       | `/user`        | Lista todos os usuários         | `UserController.read`   |
| `GET`       | `/user/:id`    | Busca um usuário por ID         | `UserController.readOne`|
| `PUT`       | `/user/:id`    | Atualiza um usuário por ID      | `UserController.update` |
| `DELETE`    | `/user/:id`    | Exclui um usuário por ID        | `UserController.delete` |


