<!-- SEED: re-run /impeccable document once there's code to capture the actual tokens and components. -->
---
name: Software House Landing Page
description: Landing page focada em conversão para desenvolvimento sob demanda
---

# Design System: Software House Landing Page

## 1. Overview

**Creative North Star: "The Neon Forge"**

Um sistema visual projetado para transmitir alta capacidade técnica e sofisticação no desenvolvimento de software sob demanda. Utiliza um ambiente dark mode profundo, ativado por acentos e glows de roxo e índigo que canalizam a atenção do usuário para as áreas de conversão (WhatsApp). 

O design rejeita explicitamente a estética minimalista "SaaS-cream" (fundo claro com ilustrações 3D padrão) e layouts corporativos burocráticos tradicionais baseados em tabelas áridas e fotos de banco de imagem. O visual é moderno, direto ao ponto e expressa engenharia de software de ponta.

**Key Characteristics:**
- Fundo escuro imersivo com profundidade visual criada via camadas de preto e cinza-escuro.
- Paleta Committed (30-60% da superfície) com acentos roxo/índigo vibrantes.
- Tipografia em família única geométrica e moderna.
- Movimento do tipo Responsive, focado em feedbacks táteis de hover refinados e transições de estado velozes.

## 2. Colors

[A paleta é dominada pelo contraste entre o fundo escuro e acentos de roxo e índigo brilhantes e saturados.]

### Primary
- **Neon Indigo** (`[to be resolved during implementation]`): A cor de marca para botões principais e pontos focais de ação.

### Neutral
- **Deep Ink Background** (`[to be resolved during implementation]`): Fundo escuro base para a interface.
- **Pure White / High Contrast Grey** (`[to be resolved during implementation]`): Texto principal com contraste de acessibilidade superior a 4.5:1.

### Named Rules
**The 10% Conversional Accent Rule.** O acento roxo/índigo neon é reservado estritamente para ações que guiam à conversão (botões de contato com especialista, destaque de serviços). Sua força visual depende da sua escassez.

## 3. Typography

**Display Font:** Inter / Outfit (ou similar sans-serif geométrica moderna)
**Body Font:** Inter / Outfit

**Character:** Pareamento limpo e consistente focado em legibilidade e visual técnico premium, sem a distração de múltiplas famílias conflitantes.

### Hierarchy
- **Display** (Bold, `[to be resolved during implementation]`): Usado em títulos do Hero da página.
- **Headline** (Semi-Bold, `[to be resolved during implementation]`): Títulos das seções de serviços e benefícios.
- **Body** (Regular, `[to be resolved during implementation]`): Texto de leitura de serviços, limitado a 65–75 caracteres de largura.
- **Label** (Medium/Semi-Bold, `[to be resolved during implementation]`): Botões e pequenos badges informativos.

## 4. Elevation

O sistema visual é plano por padrão, utilizando apenas variação de cores de fundo (tonal layering) para diferenciar seções. Sombras e glows discretos são usados exclusivamente para destacar botões ou como feedback ao passar o mouse.

### Named Rules
**The Flat-By-Default Rule.** Superfícies permanecem planas. Sombras e glows aparecem apenas em respostas a interações do usuário (hover no CTA) para manter a clareza e evitar distrações visuais.

## 5. Components

[Os tokens e estilos dos componentes serão documentados aqui após a implementação física no código.]

## 6. Do's and Don'ts

### Do:
- **Do** manter contraste de texto sempre acima de 4.5:1 contra os fundos escuros.
- **Do** limitar a largura de parágrafos de texto para no máximo 75ch.
- **Do** usar glows roxo/indigo apenas nas ações principais para guiar a atenção do usuário.

### Don't:
- **Don't** usar templates SaaS genéricos ou ilustrações 3D padrão do Webflow.
- **Don't** usar fotos corporativas clichês de banco de imagens ou visual institucional burocrático de terno e gravata.
- **Don't** aplicar gradientes em textos (`background-clip: text`) para garantir legibilidade e sobriedade.
- **Don't** usar bordas laterais coloridas de destaque (`border-left`/`border-right` com mais de 1px).
