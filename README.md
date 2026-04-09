# ☕ Coffee Shop Fullstack - Sistema de Vendas

Este projeto é um sistema de gestão de vendas para uma cafeteria (Coffee Shop), desenvolvido como parte dos requisitos acadêmicos para a disciplina de Banco de Dados. A aplicação abrange desde o catálogo de produtos até o fluxo completo de checkout, regras de desconto personalizadas e painel administrativo.

## 📋 Sobre o Projeto

O sistema foi projetado para gerenciar o ciclo de vida de uma venda, integrando o controle de estoque, perfis de clientes e relatórios gerenciais. 

### Principais Funcionalidades

- **Módulo do Cliente:**
    - Navegação pelo catálogo de produtos sem necessidade de login.
    - Filtros de busca por nome, categoria, faixa de preço e origem (Ex: Fabricados em Mari).
    - Cadastro de perfil com campos específicos: Torcedor do Flamengo, Assistir One Piece e Cidade (Sousa).
    - Histórico detalhado de pedidos realizados.
- **Regras de Negócio & Vendas:**
    - **Controle de Estoque:** Uma compra só é efetivada se houver estoque disponível. Caso contrário, a venda é bloqueada.
    - **Sistema de Descontos:** Aplicação automática de descontos para clientes que atendem aos critérios de perfil (Flamengo, One Piece de Sousa).
    - **Gestão de Pagamentos:** Suporte a Cartão, Boleto, Pix e Berries, com controle de status de confirmação.
- **Módulo Administrativo (Funcionário/Admin):**
    - Painel com métricas de faturamento e total de vendas.
    - Filtro de "Baixo Estoque" para produtos com menos de 5 unidades.
    - Gestão de status de pedidos (Pendente, Enviado, Entregue).

## 🛠️ Tecnologias Utilizadas

- **Frontend:** [React.js](https://reactjs.org/) com [React-Bootstrap](https://react-bootstrap.github.io/) para a interface gráfica.
- **Backend:** [Node.js](https://nodejs.org/) com [Express](https://expressjs.com/).
- **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/).
- **Autenticação:** JSON Web Tokens (JWT).


## 🚀 Como Executar

### Pré-requisitos
- Node.js instalado.
- PostgreSQL configurado e rodando.

### Instalação

1. **Clone o repositório**


2. **Configuração do Backend:**
    - Acesse a pasta do backend.

    - Instale as dependências: ```npm install```.

    - Configure o arquivo ```.env``` com as credenciais do seu banco de dados.

    - Execute os scripts SQL para criar as tabelas, views e procedures.

    - Inicie o servidor: ```npm run dev```.

3. **Configuração do Frontend:**

    - Acesse a pasta do frontend.

    - Instale as dependências: ```npm install```.

    - Inicie a aplicação: ```npm start```.

**Este projeto foi desenvolvido para fins didáticos, atendendo aos requisitos de implementação de sistemas de banco de dados e desenvolvimento fullstack.**