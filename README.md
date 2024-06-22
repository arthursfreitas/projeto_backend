# Projeto Backend

Este projeto é um sistema de gerenciamento de produtos, categorias, carrinhos de compras e pedidos. Ele utiliza o framework [NestJS](https://nestjs.com/) e o banco de dados PostgreSQL. O projeto fornece APIs para criar, atualizar, excluir e consultar produtos, categorias, e carrinhos de compras, além de funcionalidades de autenticação de usuários.

## Índice

- [Funcionalidades](#funcionalidades)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando o Projeto](#executando-o-projeto)
- [Documentação da API](#documentação-da-api)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Contribuindo](#contribuindo)

## Funcionalidades

1. **Autenticação de Usuários**:

   - Registro e login de usuários.
   - Proteção das rotas com JWT (JSON Web Token).

2. **Produtos**:

   - Criar um novo produto com nome, descrição, categoria e preço.
   - Listar todos os produtos com filtros por categoria e faixa de preço.
   - Obter detalhes de um produto específico.
   - Atualizar informações de um produto.
   - Excluir um produto.

3. **Categorias**:

   - Criar uma nova categoria.
   - Listar todas as categorias.
   - Obter detalhes de uma categoria específica.
   - Atualizar informações de uma categoria.
   - Excluir uma categoria.

4. **Carrinho de Compras**:

   - Adicionar produtos ao carrinho de compras.
   - Remover produtos do carrinho de compras.
   - Visualizar os produtos no carrinho de compras.
   - Finalizar a compra dos produtos no carrinho (checkout).

5. **Pedidos**:
   - Criar pedidos a partir do carrinho de compras.
   - Armazenar os itens do pedido e o valor total.

## Requisitos

- [Node.js](https://nodejs.org/) >= 14.x
- [PostgreSQL](https://www.postgresql.org/) >= 12.x

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
npm install
```

## Configuração

Crie um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente:

```bash
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=sua-senha
DATABASE_NAME=nome-do-banco

JWT_SECRET=sua-chave-secreta
JWT_EXPIRATION_TIME=3600s
```

Substitua os valores conforme sua configuração de banco de dados e chave JWT.

## Executando o Projeto

Inicie o servidor:

```bash
npm run start:dev
```

O servidor estará disponível em http://localhost:3000

## Documentação da API

A documentação da API pode ser acessada via Swagger em http://localhost:3000/api
