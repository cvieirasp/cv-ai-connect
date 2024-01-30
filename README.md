## CV AI Connect

Aplicação que conecta a AI's desenvolvida em [Next.js](https://nextjs.org/).

### Paços para criação do projeto

Executamos o seguinte comando para criação do projeto.

```bash
npx create-next-app@latest cv-ai-connect --tailwind --eslint
```

Inicializamos o [Shadcn](https://ui.shadcn.com/), componentes reutilizáveis utilizaremos em nossa aplicação.

```bash
npx shadcn-ui@latest init
```

Exemplo de configuração de um componente **Button**.

```bash
npx shadcn-ui@latest add button
```

Assim que o projeto Next.js estiver configurado, podemos instalar o **Prettier** como uma dependência de desenvolvimento, executando o seguinte comando:

```bash
npm i -D prettier
```

Para garantir que **Prettier** e **ESLint** funcionem juntos, instalamos o pacote `eslint-config-prettier`, executando o seguinte comando:

```bash
npm i -D eslint-config-prettier
```

Após a instalação, abrimos o arquivo de configuração do **ESLint** (`.eslintrc.json` ou `.eslintrc.js`) e adicionamos a seguinte linha:

```bash
{
    "extends": ["next", "prettier"]
}
```

Para classificar automaticamente as classes **CSS** do **Tailwind** usando **Prettier**, instalamos o pacote `prettier-plugin-tailwindcss`, executando o seguinte comando:

```bash
npm i -D prettier-plugin-tailwindcss
```

Em seguida, criamos o arquivo `.prettierrc.json` no diretório raiz do projeto, com o seguinte conteúdo:

```bash
{
    "trailingComma": "es5",
    "semi": false,
    "tabWidth": 2,
    "singleQuote": true,
    "jsxSingleQuote": true,
    "plugins": ["prettier-plugin-tailwindcss"]
}
```

Para usar o Prettier que definimos, podemos configurar os seguintes scripts no arquivo `package.json`:
