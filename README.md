# Exercícios de Segurança

## RBAC

Interface demonstrativa de controle de acesso baseado em papéis (_Role-Based Access Control_) para um sistema escolar. É uma implementação somente de frontend, com simulação dos perfis Administrador, Professor e Aluno.

### Link do projeto hospedado

> [Clique aqui para acessar a demonstração do RBAC](https://projetos-seguranca.vercel.app/RBAC)

### Onde encontrar o código

O exercício está organizado nos seguintes arquivos:

```text
src/
├── App.tsx                    # Roteamento simples; rota /RBAC
└── Exercises/
    └── RBAC/
        ├── index.tsx          # Interface e validação das permissões
        ├── data.ts            # Papéis, recursos e matriz de permissões
        └── types.ts           # Tipos utilizados no exercício
```

Para visualizar localmente, execute `npm run dev` e acesse `/RBAC`.

## Exercício 02 - OAuth 2.0 do Google

Implementação independente do fluxo de autenticação OAuth 2.0 do Google com Bun, Express e `google-auth-library`.

### Onde encontrar o código

```text
src/Exercises/google-oauth-express/
├── public/index.html
├── src/index.js
├── process.env.example
├── package.json
└── bun.lock
```

### Como executar a partir da raiz do projeto

1. Preencha o `GOOGLE_CLIENT_SECRET` no arquivo local `src/Exercises/google-oauth-express/process.env`.
2. Na raiz do repositório, execute:

```bash
cd src/Exercises/google-oauth-express
npx --yes bun --env-file=process.env src/index.js
```

3. Abra `http://localhost:3000` no navegador. Não abra o arquivo `public/index.html` diretamente.

## Cifra de César e Criptoanálise

Implementação da Cifra de César com chave de 1 a 26 e análise da ocorrência de letras do texto cifrado.

### Link do projeto hospedado

> [Clique aqui para acessar a demonstração da Cifra de César](https://projetos-seguranca.vercel.app/cifra-de-cesar)

### Caminho do algoritmo

```text
src/Exercises/CifraDeCesar/algorithm.ts
```

O exercício pode ser acessado localmente em `/cifra-de-cesar`.

## Cifra de Feistel - 16 rodadas

Implementação didática de uma rede de Feistel com 16 rodadas. A função `F` usa operações simples de rotação de bits e XOR. O exercício contempla encriptação e decriptação com as subchaves aplicadas em ordem inversa.

### Link do projeto hospedado

> [Clique aqui para acessar a demonstração da Cifra de Feistel](https://projetos-seguranca.vercel.app/cifra-de-feistel)

### Caminho do algoritmo

```text
src/Exercises/CifraDeFeistel/algorithm.ts
```

### Como executar

1. Execute `npm install` para instalar as dependências.
2. Execute `npm run dev`.
3. Acesse `http://localhost:5173/cifra-de-feistel`.

## Exercício 07 - Blum Blum Shub + Teste na Suite do NIST

### Como executar

Execute o comando abaixo na raiz do projeto para gerar 1.000.000 de bits:

```bash
npm run bbs:nist
```

Para escolher outra quantidade de bits, execute:

```bash
node src/Exercises/BlumBlumShub/generate.ts 100000
```

O script cria `bb_bits.txt`, formatado em linhas curtas para leitura, e `bb_bits_nist.txt`, sem quebras de linha, para inserir no testador.

## Diffie-Hellman (DH) - Compartilhamento de segredo

### Como executar

Execute o comando abaixo na raiz do projeto. Ele imprime os valores escolhidos de `p`, `g`, `a`, `b`, os valores públicos `A` e `B`, e o segredo compartilhado `s`:

```bash
npm run dh
```
