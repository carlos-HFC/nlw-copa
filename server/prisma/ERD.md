# NLW Copa

- [Pools](#pools)
- [Participants](#participants)
- [Users](#users)
- [Games](#games)
- [Guesses](#guesses)

## Pools
```mermaid
erDiagram
"Pool" {
  String id PK
  String ownerId FK "nullable"
  String title
  String code UK
  DateTime createdAt
}
```

### `Pool`
Bolão.

Todo bolão realizado pelos usuários participantes.

**Properties**
  - `id`: Chave primária.
  - `ownerId`: ID do dono do bolão [users.id](#users)
  - `title`: Título do bolão
  - `code`: Código para o bolão
  - `createdAt`: Data de criação


## Participants
```mermaid
erDiagram
"Participant" {
  String id PK
  String userId FK
  String poolId FK
}
```

### `Participant`
Participantes.

Armazenar os participantes dos bolões.

**Properties**
  - `id`: Chave primária.
  - `userId`: ID do usuário participante [users.id](#users)
  - `poolId`: ID do bolão [pools.id](#pools)


## Users
```mermaid
erDiagram
"User" {
  String id PK
  String name
  String email UK
  String avatarUrl "nullable"
  DateTime createdAt
}
```

### `User`
Usuários.

Armazenar os usuários.

**Properties**
  - `id`: Chave primária.
  - `name`: Nome do usuário
  - `email`: E-mail do usuário
  - `avatarUrl`: URL do avatar do usuário
  - `createdAt`: Data de criação


## Games
```mermaid
erDiagram
"Game" {
  String id PK
  DateTime date
  String firstTeamCountryCode
  String secondTeamCountryCode
}
```

### `Game`
Jogos.

Armazenar os jogos da copa.

**Properties**
  - `id`: Chave primária.
  - `date`: Data do jogo
  - `firstTeamCountryCode`: Código do time mandante
  - `secondTeamCountryCode`: Código do time visitante


## Guesses
```mermaid
erDiagram
"Guess" {
  String id PK
  String gameId FK
  String participantId FK
  Int firstTeamPoints
  Int secondTeamPoints
  DateTime createdAt
}
```

### `Guess`
Palpites.

Armazenar de palpites.

**Properties**
  - `id`: Chave primária.
  - `gameId`: ID do jogo [games.id](#games)
  - `participantId`: ID do usuário participante [participants.id](#participants)
  - `firstTeamPoints`: Gols marcados pelo time mandante
  - `secondTeamPoints`: Gols marcados pelo time visitante
  - `createdAt`: Data do jogo