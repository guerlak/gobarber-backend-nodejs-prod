# GoBarber - Backend - Funcionalidades

# Recuperação de senha

**Requisitos Funcionais**

- O usuário deve recuperar sua senha informando o email
- O usuário deve receber um email com as instruções de recuperação de senha.
- O usuário deve resetar sua senha.

**Requisitos Não Funcionais**

- Mailtrap para testar envios de email em dev env.
- Amazon SES para envios em produção
- Envio de Email deve correr em backgroung job

**Regras de Negócio**

- O link enviado por email para rest de senha de deve expirar em 2h
- o usuário precisa confirmar a nova senha ao reseta-lá.

# Atualização do perfil

**Requisitos Funcionais**

- Possibilidade do usuário alterar nome, email e/ou senha.

**Regras de Negócio**

- O usuário não pode alterar email por um já existente no app
- Confirmação de senha ao alterar
- O usuário deve informar a senha antiga

# Painel do prestador de serviço

**Requisitos Funcionais**

- Listagem de agedamentos de uma dia específico
- O prestador deve receber uma notificação sempre que houver um novo agendamento
- O prestador deve visualizar as notificações não lidas

**Requisitos Não Funcionais**

- Os agendamentos do prestador do dia devem ser armazenados em cache
- As notificações do prestador devem ser armazenadas no MongoDB
- As notificações do prestador devem ser enviadas ao prestador em tempo real

**Regras de Negócio**

- Cada agendamento deve durar 1h exatamente
- Primeiro horario as 08h00 e ultimo as 19h00
- Não possibiltar agendamentos já marcados ou de datas anteriores ao dia corrente
- Usuário não pode realizar agendamentos com ele mesmo

# Agendamentos de serviços

**Requisitos Funcionais**

- Listagem de todos os serviços cadastrados
- Visualização dos dias do mês com pelo menos um horário disponível
- Visualização de horários de um dia do pestador
- Realizaçãp de um novo agendamento

**Requisitos Não Funcionais**

- A listagem de prestadores devem ser armazenadas em cache

**Regras de Negócio**

- Cada agendamento deve durar 1h exatamente
- Primeiro horario as 08h00 e ultimo as 19h00
- Não possibiltar agendamentos já marcados ou de datas anteriores ao dia corrente
- Usuário não pode realizar agendamentos com ele mesmo
