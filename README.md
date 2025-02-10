# Sistema de Gerenciamento - Clínica Pezzott

Sistema completo para gerenciamento de clínica, incluindo cadastro de pacientes, agendamento de consultas e gestão de sessões.

## Funcionalidades

- Cadastro e gestão de pacientes
- Agendamento de consultas
- Controle de sessões
- Gerenciamento de usuários
- Dashboard com informações relevantes

## Tecnologias Utilizadas

- Frontend: React.js com Material-UI
- Backend: Node.js com Express
- Banco de Dados: MySQL com Sequelize
- Autenticação: JWT

## Requisitos

- Node.js 14+
- MySQL 5.7+
- NPM ou Yarn

## Instalação

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/clinica-pezzott-system.git
```

2. Instale as dependências do backend
```bash
cd backend
npm install
```

3. Instale as dependências do frontend
```bash
cd frontend
npm install
```

4. Configure as variáveis de ambiente (crie um arquivo .env em cada diretório)

5. Execute as migrações do banco de dados
```bash
cd backend
npx sequelize-cli db:migrate
```

6. Inicie o servidor backend
```bash
npm run dev
```

7. Inicie o servidor frontend
```bash
npm run dev
```

## Contribuição

Este é um projeto privado da Clínica Pezzott. Contribuições devem ser discutidas internamente.

## Licença

Todos os direitos reservados - Clínica Pezzott © 2024 