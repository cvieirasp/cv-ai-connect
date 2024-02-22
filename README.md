## CV-AI Connect

Aplicação que conecta a AI's desenvolvida em [Next.js](https://nextjs.org/).

### Criação e estruturação do projeto

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

### Configuração da autenticação utilizando Clerk

Criamos a conta na plataforma [Clerk](https://clerk.com) e configuramos a aplicação.

Para configuração e utilização do **Clerk**, instalamos o pacote utilizando o seguinte comando:

```bash
npm install @clerk/nextjs
```

Em seguida, adicionamos o código a seguir ao arquivo `.env.local` para definir as chaves pública e secreta.

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=​your_publishable_key​
CLERK_SECRET_KEY=​sk_test_***
```

O componente `<ClerkProvider>` fornece sessão ativa e contexto de usuário para hooks do **Clerk** e outros componentes. Para o nosso projeto, agrupamos o elemento `<html />` com `<ClerkProvider>`, tornando a sessão ativa e o contexto do usuário acessíveis em qualquer lugar da aplicação.

```bash
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang='pt-BR'>
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
```

Agora que o **Clerk** está instalado e montado em nossa aplicação, podemos decidir quais páginas serão públicas e quais devem exigir autenticação para acesso. Criamos o arquivo `middleware.ts` dentro da pasta `src`, com o seguinte conteúdo:

```bash
import { authMiddleware } from '@clerk/nextjs'

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ['/'],
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
```

Para a página de registro, criamos um novo arquivo (`\src\app\(auth)\(routes)\sign-up\[[...sign-up]]\page.jsx`) que será usado para renderizar a página de inscrição:

```bash
import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return <SignUp />
}
```

Para a página de Login, criamos um novo arquivo (`\src\app\(auth)\(routes)\sign-in\[[...sign-in]]\page.jsx`) que será usado para renderizar a página de login:

```bash
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <SignIn />
}
```

Em seguida, adicionamos variáveis de ambiente para os caminhos `signIn`, `signUp`, `afterSignUp` e `afterSignIn`:

```bash
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### Criação da sidebar

Adicionamos o componente **sheet** responsável por controlar a visibilidade da barra lateral a partir do menu hambúrguer.

```bash
npx shadcn-ui@latest add sheet
```

### Criação da página Dashboard

Adicionamos o componente **card** responsável por exibir as ferramentas para seleção.

```bash
npx shadcn-ui@latest add card
```

### Configuração da API OpenAI

Criamos a conta na plataforma [OpenAI](https://platform.openai.com/) e geramos uma chave secreta.

Em seguida, adicionamos a chave ao arquivo `.env.local`.

```bash
OPENAI_API_KEY=sk***
```

Para configuração e utilização da API **OpenAI**, instalamos o pacote utilizando o seguinte comando:

```bash
npm install openai
```

### Criação da página de Conversação

Adicionamos o componente **form** responsável por exibir formulário e respectivos componentes.

```bash
npx shadcn-ui@latest add form
```

Adicionamos o componente **input** responsável por exibir campo de texto nos formulários.

```bash
npx shadcn-ui@latest add input
```

Instalamos o pacote **Axios** para realizarmos as integrações com as API's:

```bash
npm install axios
```

Adicionamos o componente **avatar** responsável por exibir o avatar proveninente do **Clerk**.

```bash
npx shadcn-ui@latest add avatar
```

### Criação da página de Geração de Código

Instalamos o pacote **react-markdown** para que a resposta gerada pela IA seja exibida formatada.

```bash
npm install react-markdown
```

### Criação da página de Geração de Imagem

Adicionamos o componente **select** responsável por exibir campo lista nos formulários.

```bash
npx shadcn-ui@latest add select
```

### Configuração da API Replicate

Criamos a conta na plataforma [Replicate](https://replicate.com) e geramos um token.

Em seguida, adicionamos token ao arquivo `.env.local`.

```bash
REPLICATE_API_TOKEN=r8***
```

Para configuração e utilização da API **Replicate**, instalamos o pacote utilizando o seguinte comando:

```bash
npm install replicate
```

### Criação da página de Geração de Música

Adicionamos a tag **audio** para exibir a música gerada.

### Criação da página de Geração de Vídeo

Adicionamos a tag **video** para exibir o vídeo gerado.

### Desenvolvimento da funcionalidade de limitação de uso de recurso

Criamos a conta na plataforma [Supabase](https://supabase.com) e configuramos um projeto de Banco de Dados.

Adicionamos o [Prisma](https://www.prisma.io/docs/getting-started/quickstart) para interagirmos com banco de dados utilizando o seguinte comando:

```bash
npm i -D prisma
```

Para iniciarmos o **Prisma**, utilizamos o comando abaixo:

```bash
npx prisma init
```

Inserimos a configuração abaixo no arquivo `package.json`.

```bash
"prisma": {
    "schema": "src/db/schema.prisma"
},
```

Instalamos o _client_ do **Prisma** utilizando o seguinte comando:

```bash
npm i @prisma/client
```

Para nos ajudar com diferentes arquivos `.env`, instalamos o pacote `.dotenv-cli`.

```bash
npm i -D dotenv-cli
```

Criamos o modelo da nossa tabela de banco de dados no arquivo `schema.prisma`.

```bash
model UserApiLimit {
  id        String    @id @default(uuid())
  userId    String    @unique
  count     Int       @default(0)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}
```

Executamos o comando abaixo para criar a tabela no **Supabase**.

```bash
npx dotenv -e .env.local -- npx prisma db push
```

Executamos o comando abaixo para gerar nosso cliente **Prisma**.

```bash
npx dotenv -e .env.local -- npx prisma generate
```
