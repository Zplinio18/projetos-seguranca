import "dotenv/config";
import express from "express";
import { OAuth2Client } from "google-auth-library";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const app = express();
const port = 3000;

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } = process.env;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URI) {
  throw new Error("Configure GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET e GOOGLE_REDIRECT_URI.");
}

// Cliente OAuth configurado com as credenciais criadas no Google Cloud.
const client = new OAuth2Client(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
);

const indexPath = fileURLToPath(new URL("../public/index.html", import.meta.url));
let authenticatedUser = null;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

app.get("/", async (_request, response, next) => {
  try {
    // Gera a URL para a tela de consentimento/autenticação do Google.
    const authorizationUrl = client.generateAuthUrl({
      scope: ["email", "profile", "openid"],
    });

    // O HTML do tutorial recebe a URL de autenticação gerada nesta requisição.
    const page = await readFile(indexPath, "utf-8");
    response.send(page.replace("__GOOGLE_AUTH_URL__", authorizationUrl));
  } catch (error) {
    next(error);
  }
});

app.get("/callback", async (request, response, next) => {
  try {
    const code = request.query.code;
    if (typeof code !== "string") {
      response.status(400).send("Código de autorização não recebido.");
      return;
    }

    // Troca o código de autorização pelos tokens fornecidos pelo Google.
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    if (!tokens.id_token) {
      throw new Error("O Google não retornou um ID Token.");
    }

    // Valida o ID Token e recupera os dados assinados da conta autenticada.
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    // Nome e e-mail serão usados apenas na página de boas-vindas do exercício.
    authenticatedUser = {
      name: payload?.name ?? "Usuário",
      email: payload?.email ?? "E-mail não disponível",
    };

    // Após validar o login, redireciona para a página solicitada pelo tutorial.
    response.redirect("/welcome");
  } catch (error) {
    next(error);
  }
});

app.get("/welcome", (_request, response) => {
  if (!authenticatedUser) {
    response.redirect("/");
    return;
  }

  response.send(`<!doctype html>
<html lang="pt-BR">
  <head><meta charset="UTF-8" /><title>Boas-vindas</title></head>
  <body>
    <h1>Bem-vindo, ${escapeHtml(authenticatedUser.name)}!</h1>
    <p>Seu e-mail: ${escapeHtml(authenticatedUser.email)}</p>
  </body>
</html>`);
});

app.use((error, _request, response, _next) => {
  console.error("Erro na autenticação:", error);
  response.status(500).send("Não foi possível concluir a autenticação.");
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
