# Exercícios de Segurança

## RBAC

Interface demonstrativa de controle de acesso baseado em papéis (_Role-Based Access Control_) para um sistema escolar. É uma implementação somente de frontend, com simulação dos perfis Administrador, Professor e Aluno.

### Link do projeto hospedado

`[Acessar demonstração]()`

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

## Cifra de César e Criptoanálise

Implementação da Cifra de César com chave de 1 a 26 e análise da ocorrência de letras do texto cifrado.

### Link do projeto hospedado

`[Acessar demonstração]()`

### Caminho do algoritmo

```text
src/Exercises/CifraDeCesar/algorithm.ts
```

O exercício pode ser acessado localmente em `/cifra-de-cesar`.

## Cifra de Feistel - 16 rodadas

Implementação didática de uma rede de Feistel com 16 rodadas. A função `F` usa operações simples de rotação de bits e XOR. O exercício contempla encriptação e decriptação com as subchaves aplicadas em ordem inversa.

### Link do projeto hospedado

`[Acessar demonstração]()`

### Caminho do algoritmo

```text
src/Exercises/CifraDeFeistel/algorithm.ts
```

### Como executar

1. Execute `npm install` para instalar as dependências.
2. Execute `npm run dev`.
3. Acesse `http://localhost:5173/cifra-de-feistel`.
