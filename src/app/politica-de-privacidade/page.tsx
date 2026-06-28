import Link from "next/link";
import AtlasLogo from "../components/ui/AtlasLogo";
import { ArrowLeft, Shield, Lock, Eye, FileText, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Política de Privacidade | Atlas",
  description: "Entenda como a Atlas protege seus dados em conformidade com a LGPD (Lei Geral de Proteção de Dados).",
};

export default function PoliticaPrivacidade() {
  return (
    <>
      {/* Background blobs to match landing page aesthetics */}
      <div className="glow-blobs-container">
        <div className="glow-blob glow-blob-1" style={{ opacity: 0.15 }} />
        <div className="glow-blob glow-blob-2" style={{ opacity: 0.15 }} />
      </div>

      {/* Header */}
      <header className="navbar">
        <div className="container nav-container">
          <Link href="/" className="logo">
            <AtlasLogo size={64} />
            <span>Atlas</span>
            <span className="logo-divider">/</span>
            <span className="logo-section">Privacidade</span>
          </Link>
          <nav>
            <Link href="/" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <ArrowLeft size={16} />
              Voltar para o site
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content-wrapper" style={{ paddingTop: "140px", paddingBottom: "80px" }}>
        <div className="global-dots-bg" />
        <div className="container" style={{ maxWidth: "800px" }}>
          
          {/* Hero of the page */}
          <div style={{ marginBottom: "48px", textAlign: "center" }}>
            <div style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              justifyContent: "center", 
              width: "64px", 
              height: "64px", 
              borderRadius: "50%", 
              backgroundColor: "rgba(157, 85, 255, 0.1)", 
              border: "1px solid rgba(157, 85, 255, 0.2)",
              color: "var(--color-primary)",
              marginBottom: "24px"
            }}>
              <Shield size={32} />
            </div>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "16px", color: "var(--text-primary)" }}>
              Política de Privacidade
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", margin: "0 auto", maxWidth: "600px" }}>
              Esta política detalha como a Atlas coleta, utiliza, processa e protege suas informações em total conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "16px" }}>
              Última atualização: Junho de 2026
            </p>
          </div>

          <div className="privacy-body" style={{ 
            backgroundColor: "rgba(18, 16, 30, 0.5)", 
            border: "1px solid var(--border-subtle)", 
            borderRadius: "var(--radius-lg)",
            padding: "40px",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
            gap: "32px"
          }}>
            
            <section>
              <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <FileText size={20} style={{ color: "var(--color-primary)" }} />
                1. Quem somos e quem controla os dados?
              </h2>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>
                A <strong>Atlas</strong>, representada por seus fundadores Davi (Frontend & UI/UX) e Matias (Fullstack), atua como <strong>Controladora</strong> de dados no tratamento das informações pessoais coletadas nesta Landing Page. Nós somos responsáveis por tomar as decisões referentes ao tratamento de dados pessoais com transparência e segurança.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <Eye size={20} style={{ color: "var(--color-primary)" }} />
                2. Quais dados coletamos e por quê?
              </h2>
              <p style={{ color: "var(--text-secondary)", marginBottom: "16px" }}>
                Coletamos a menor quantidade possível de dados necessários para viabilizar o contato comercial e responder às suas dúvidas. O tratamento ocorre sob as seguintes condições:
              </p>
              <ul style={{ color: "var(--text-secondary)", paddingLeft: "24px", display: "flex", flexDirection: "column", gap: "12px", listStyleType: "disc" }}>
                <li>
                  <strong>Formulário de Contato:</strong> Coletamos seu nome, tipo de projeto e descrição opcional do sistema. A finalidade exclusiva é entender suas necessidades para elaborar uma proposta comercial preliminar.
                </li>
                <li>
                  <strong>Chat Comercial (Ayla):</strong> As mensagens digitadas no chat são enviadas para a nossa API comercial para que o assistente inteligente processe o texto e ofereça respostas rápidas. Nenhuma informação de identificação pessoal é obrigatória no chat.
                </li>
                <li>
                  <strong>Cookies e Dados de Navegação:</strong> Coletamos dados estritamente técnicos (como a largura da janela do chat e suas escolhas de consentimento de cookies) armazenados no seu navegador para manter a qualidade e o estado da sua navegação. Não utilizamos cookies de rastreamento de terceiros para publicidade direcionada.
                </li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <Lock size={20} style={{ color: "var(--color-primary)" }} />
                3. Qual a base legal para o tratamento?
              </h2>
              <p style={{ color: "var(--text-secondary)", marginBottom: "12px" }}>
                De acordo com o Artigo 7º da LGPD, baseamos nossas atividades de tratamento nos seguintes fundamentos jurídicos:
              </p>
              <ul style={{ color: "var(--text-secondary)", paddingLeft: "24px", display: "flex", flexDirection: "column", gap: "8px", listStyleType: "disc" }}>
                <li>
                  <strong>Procedimentos Preliminares à Execução de Contrato (Art. 7º, V):</strong> Quando você preenche o formulário ou usa o chat comercial buscando orçamento para construir seu próprio software sob medida.
                </li>
                <li>
                  <strong>Legítimo Interesse (Art. 7º, IX):</strong> Para melhoria contínua da nossa Landing Page e suporte básico comercial.
                </li>
                <li>
                  <strong>Consentimento (Art. 7º, I):</strong> Quando você explicitamente aceita os cookies não essenciais ou assinala o consentimento no formulário de contato.
                </li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <Shield size={20} style={{ color: "var(--color-primary)" }} />
                4. Compartilhamento de dados com terceiros
              </h2>
              <p style={{ color: "var(--text-secondary)" }}>
                A Atlas <strong>não vende, aluga ou compartilha</strong> seus dados pessoais com terceiros para fins publicitários ou promocionais. O único compartilhamento técnico de informações ocorre no chat comercial inteligente (Ayla), cujas mensagens de texto são processadas de forma segura através das APIs de inteligência artificial da Google (Gemini) para formular as respostas. Esse processamento segue rigorosas diretrizes de privacidade de dados.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircle2 size={20} style={{ color: "var(--color-primary)" }} />
                5. Seus direitos como Titular dos Dados (Art. 18 LGPD)
              </h2>
              <p style={{ color: "var(--text-secondary)", marginBottom: "12px" }}>
                Você possui total controle sobre seus dados e pode exercer os seguintes direitos a qualquer momento:
              </p>
              <ul style={{ color: "var(--text-secondary)", paddingLeft: "24px", display: "flex", flexDirection: "column", gap: "8px", listStyleType: "disc" }}>
                <li>Confirmar a existência do tratamento de dados.</li>
                <li>Acessar seus dados pessoais tratados por nós.</li>
                <li>Corrigir dados incompletos, inexatos ou desatualizados.</li>
                <li>Solicitar a eliminação, bloqueio ou anonimização de dados desnecessários ou tratados em desconformidade.</li>
                <li>Revogar seu consentimento dado anteriormente.</li>
              </ul>
              <p style={{ color: "var(--text-secondary)", marginTop: "12px" }}>
                Para exercer qualquer um desses direitos, basta entrar em contato direto conosco através do nosso canal de comunicação indicado na Seção 7.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <Lock size={20} style={{ color: "var(--color-primary)" }} />
                6. Segurança e Retenção
              </h2>
              <p style={{ color: "var(--text-secondary)" }}>
                Adotamos medidas administrativas e tecnológicas adequadas para proteger seus dados contra acessos não autorizados ou incidentes de segurança. As conexões a esta Landing Page são totalmente criptografadas (HTTPS). Retemos as informações enviadas apenas pelo tempo estritamente necessário para prestar o atendimento comercial inicial ou cumprir obrigações legais.
              </p>
            </section>

            <section style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "24px" }}>
              <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: "12px" }}>
                7. Canal de Contato do Encarregado
              </h2>
              <p style={{ color: "var(--text-secondary)" }}>
                Para esclarecer qualquer dúvida em relação a esta política, requerer a exclusão de seus dados ou realizar qualquer solicitação de privacidade, entre em contato direto com os fundadores e encarregados pelo e-mail ou WhatsApp:
              </p>
              <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <p style={{ color: "var(--text-primary)" }}>
                  <strong>WhatsApp de Privacidade/DPO:</strong> <a href="https://wa.me/5511995995088" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>+55 (11) 99599-5088</a>
                </p>
                <p style={{ color: "var(--text-primary)" }}>
                  <strong>Endereço de Operação:</strong> Salto - SP, Brasil
                </p>
              </div>
            </section>

          </div>
        </div>
      </main>

      {/* Simplified Footer for compliance page */}
      <footer className="footer" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container footer-bottom">
          <div className="footer-bottom-wrapper" style={{ justifyContent: "center" }}>
            <p className="text-xs">
              © {new Date().getFullYear()} Atlas. Todos os direitos reservados. Em conformidade com a LGPD.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
