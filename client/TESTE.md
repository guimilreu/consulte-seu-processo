# 🧪 Guia de Testes - Consulte seu Processo

## 🚀 Como Testar a Aplicação

### 1️⃣ Iniciar o Servidor
```bash
npm run dev
```
Acesse: `http://localhost:3000`

---

## 👤 Teste como CLIENTE

### Login
1. Acesse `/login`
2. Use as credenciais:
   ```
   Email: maria.santos@email.com
   Senha: 123456
   ```

### Funcionalidades
- ✅ Ver lista de 3 processos
- ✅ Clicar em um processo para ver timeline completa
- ✅ Ver andamentos com datas, descrições e anexos
- ✅ Botão de exportar PDF (mockado)
- ✅ Menu de usuário com logout
- ✅ Navbar simples (sem navegação extra)

---

## 👨‍💼 Teste como ADMIN

### Login
1. Acesse `/login` (única página de login)
2. Use as credenciais:
   ```
   Email: fabio@email.com
   Senha: admin
   ```
3. ✅ Será redirecionado automaticamente para `/admin/dashboard`

### Dashboard
- ✅ Ver 4 cards de estatísticas:
  - Total de Clientes: 4
  - Total de Processos: 5
  - Processos Ativos: 4
  - Processos Concluídos: 1
- ✅ Ver lista de processos recentes

### Processos (`/admin/dashboard/processos`)
- ✅ Ver lista de todos os 5 processos
- ✅ Ver informações: número, cliente, status, data
- ✅ Botão "Novo Processo" (visual apenas)
- ✅ Botão "Gerenciar" em cada processo

### Clientes (`/admin/dashboard/clientes`)
- ✅ Ver lista de 4 clientes
- ✅ Ver: nome, email, CPF, telefone, quantidade de processos
- ✅ Clicar em "Novo Cliente"
- ✅ Preencher formulário e adicionar cliente
- ✅ Ver novo cliente aparecer na lista

### Busca (`/admin/dashboard/busca`)
- ✅ Digitar no campo de busca
- ✅ Ver resultados em tempo real (debounce 500ms)
- ✅ Buscar por:
  - Número do processo: `0001234`
  - Nome do cliente: `Maria`
  - Palavra-chave: `indenização`
  - Cliente: `João`

### Navegação
- ✅ Navbar completa com 4 itens
- ✅ Item ativo destacado
- ✅ Logo redireciona para `/admin/dashboard`
- ✅ Menu de usuário mostra "Administrador" ou "Equipe"

---

## 🔀 Teste de Redirecionamento

### Página Inicial (`/`)
- Se **não logado**: → `/login`
- Se **cliente logado**: → `/dashboard`
- Se **admin logado**: → `/admin/dashboard`

### Proteção de Rotas
1. Logout como admin
2. Tente acessar `/admin/dashboard`
3. ✅ Deve redirecionar para `/login`

4. Login como cliente
5. Tente acessar `/admin/dashboard`
6. ✅ Deve redirecionar para `/dashboard`

---

## 🧩 Teste de Integração

### Fluxo Completo - Cliente
1. Acesse `/` → Redireciona para `/login`
2. Login com cliente → Redireciona para `/dashboard`
3. Ver 3 processos
4. Clicar no primeiro processo
5. Ver timeline com 6 andamentos
6. Voltar para lista
7. Clicar em "Exportar PDF"
8. Logout → Redireciona para `/login`

### Fluxo Completo - Admin
1. Acesse `/login`
2. Login com admin → Redireciona automaticamente para `/admin/dashboard`
3. Ver estatísticas
4. Navegar para "Clientes"
5. Adicionar novo cliente
6. Navegar para "Processos"
7. Ver todos os processos
8. Navegar para "Busca"
9. Buscar "divórcio"
10. Ver 1 resultado
11. Logout → Redireciona para `/login`

---

## 🎨 Teste de UX/UI

### Responsividade
- ✅ Teste em diferentes tamanhos de tela
- ✅ Mobile, tablet, desktop

### Estados de Loading
- ✅ Login mostra spinner no botão
- ✅ Listas mostram "Carregando..."
- ✅ Busca mostra "Buscando..."

### Mensagens de Erro
- ✅ Tente login com credenciais erradas
- ✅ Ver mensagem de erro vermelha

### Navegação
- ✅ Items ativos destacados na navbar
- ✅ Hover states em cards
- ✅ Transições suaves

---

## 📊 Dados Disponíveis

### Processos
1. **Ação de Indenização** (Maria - 6 andamentos)
2. **Revisão de Contrato** (Maria - 3 andamentos)
3. **Inventário e Partilha** (Maria - 2 andamentos)
4. **Ação Trabalhista** (João - 4 andamentos)
5. **Divórcio Consensual** (Ana - 3 andamentos - Concluído)

### Clientes
1. Maria Silva Santos - 3 processos
2. João Pedro Oliveira - 1 processo
3. Ana Carolina Souza - 1 processo
4. Pedro Henrique Costa - 0 processos

---

## ✅ Checklist de Testes

### Autenticação
- [ ] Login cliente funciona
- [ ] Login admin funciona
- [ ] Logout funciona
- [ ] Redirect baseado em role funciona
- [ ] Proteção de rotas funciona

### Cliente
- [ ] Dashboard lista processos
- [ ] Timeline mostra andamentos
- [ ] Anexos aparecem
- [ ] Export PDF funciona (alert)

### Admin
- [ ] Dashboard mostra stats
- [ ] Processos lista todos
- [ ] Clientes lista todos
- [ ] Adicionar cliente funciona
- [ ] Busca funciona em tempo real

### Navegação
- [ ] Navbar muda por role
- [ ] Items ativos destacados
- [ ] Links funcionam
- [ ] Logo redireciona correto

### UX
- [ ] Loading states aparecem
- [ ] Erros são mostrados
- [ ] Responsivo em mobile
- [ ] Hover states funcionam

