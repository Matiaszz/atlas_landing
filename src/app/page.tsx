"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  Terminal, 
  Smartphone, 
  Laptop, 
  Globe, 
  Cpu, 
  Code2, 
  MessageSquare, 
  Send, 
  X, 
  ChevronRight, 
  CheckCircle2 
} from "lucide-react";

// Platform Type
interface Platform {
  id: string;
  name: string;
  icon: React.ReactNode;
  tech: string[];
}

export default function Home() {
  // Preloader states
  const [preloaderActive, setPreloaderActive] = useState<boolean>(true);
  const [preloaderAnim, setPreloaderAnim] = useState<boolean>(false);
  const [preloaderFade, setPreloaderFade] = useState<boolean>(false);

  // State for active navbar section
  const [activeSection, setActiveSection] = useState<string>("hero");

  // State for application configuration estimator
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["web"]);
  const [complexity, setComplexity] = useState<number>(2); // 1 = MVP, 2 = Core, 3 = Scaled Enterprise
  const [copied, setCopied] = useState<boolean>(false);

  // Live chat states
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'agent', text: string, whatsappUrl?: string, buttons?: string[] }>>([
    { 
      sender: 'agent', 
      text: 'Olá! Carregando assistente comercial...',
      buttons: [],
      whatsappUrl: ''
    }
  ]);
  const [chatInput, setChatInput] = useState<string>("");
  const [chatIsTyping, setChatIsTyping] = useState<boolean>(false);
  const [typingText, setTypingText] = useState<string>("Ayla está pensando...");
  const [isOnline, setIsOnline] = useState<boolean>(true);

  // Ref for chat window scrolling
  const chatBodyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat on new messages or typing state changes
  useEffect(() => {
    if (chatOpen && chatBodyRef.current) {
      const scrollToBottom = () => {
        if (chatBodyRef.current) {
          chatBodyRef.current.scrollTo({
            top: chatBodyRef.current.scrollHeight,
            behavior: "smooth"
          });
        }
      };
      
      // Delay slightly to allow DOM/state updates to complete
      const scrollTimeout = setTimeout(scrollToBottom, 50);
      return () => clearTimeout(scrollTimeout);
    }
  }, [chatMessages, chatIsTyping, chatOpen]);

  // Initialize welcome message and check online status dynamically on mount
  useEffect(() => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const online = day >= 1 && day <= 5 && hour >= 8 && hour < 16;
    setIsOnline(online);
    
    const statusText = online 
      ? "estamos ONLINE e prontos para conversar!"
      : "estamos OFFLINE no momento (nosso horário comercial é de Segunda a Sexta, das 08h às 16h), mas você já pode deixar sua ideia registrada!";

    setChatMessages([
      {
        sender: 'agent',
        text: `Olá! Eu sou a Ayla, a assistente comercial inteligente da Atlas NS. No momento, ${statusText} Qual sistema você deseja construir hoje?`,
        buttons: ['whatsappButton', 'portfolioMatias', 'portfolioDavi'],
        whatsappUrl: `https://wa.me/5511995995088?text=${encodeURIComponent("Olá Davi e Matias! Vim do site da Atlas NS e gostaria de iniciar um projeto.")}`
      }
    ]);
  }, []);

  // Dynamic typing message cycle for commercial bot
  useEffect(() => {
    if (!chatIsTyping) return;
    
    const phrases = [
      "Ayla está pensando... 🧠",
      "Formatando a melhor arquitetura... 🛠️",
      "Consultando o Davi e o Matias no WhatsApp... 💬",
      "Calculando prazos e atalhos comerciais... 💰",
      "Ayla está de olho na melhor stack... 🚀",
      "Preparando a solução perfeita para você... ✨",
      "Ayla está digitando... 💻",
      "Ayla está conectando com a API comercial... ⚡"
    ];
    
    setTypingText(phrases[Math.floor(Math.random() * phrases.length)]);
    
    const interval = setInterval(() => {
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      setTypingText(randomPhrase);
    }, 1800);
    
    return () => clearInterval(interval);
  }, [chatIsTyping]);

  // Preloader Lifecycle
  useEffect(() => {
    // Stage 1: Trigger symbol opening animation
    const animTimeout = setTimeout(() => {
      setPreloaderAnim(true);
    }, 150);

    // Stage 2: Trigger fade out of overall preloader screen (at 750ms, lasting 400ms)
    const fadeTimeout = setTimeout(() => {
      setPreloaderFade(true);
    }, 750);

    // Stage 3: Fully unmount preloader (at 1150ms)
    const activeTimeout = setTimeout(() => {
      setPreloaderActive(false);
    }, 1150);

    return () => {
      clearTimeout(animTimeout);
      clearTimeout(fadeTimeout);
      clearTimeout(activeTimeout);
    };
  }, []);

  // Active navigation tracker
  useEffect(() => {
    const sections = ["hero", "services", "estimator", "team", "principles", "contact"];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // If we are at the bottom of the page, activate the contact section
      if (scrollPosition + windowHeight >= documentHeight - 50) {
        setActiveSection("contact");
        return;
      }
      
      // Check which section is in focus (120px offset to account for navbar height)
      const triggerLine = scrollPosition + 120;
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.getBoundingClientRect().top + scrollPosition;
          const height = el.offsetHeight;
          if (triggerLine >= top && triggerLine < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    const initTimeout = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(initTimeout);
    };
  }, []);

  const platforms: Platform[] = [
    { id: "web", name: "Sistemas Web", icon: <Globe size={20} />, tech: ["Next.js", "Node.js", "PostgreSQL"] },
    { id: "android", name: "Aplicativo Android", icon: <Smartphone size={20} />, tech: ["Flutter", "Dart", "SQLite"] },
    { id: "ios", name: "Aplicativo iOS", icon: <Smartphone size={20} />, tech: ["Flutter", "Dart", "SQLite"] },
    { id: "windows", name: "Aplicativo Windows", icon: <Laptop size={20} />, tech: ["Flutter", "Dart"] },
    { id: "linux", name: "Sistemas Linux", icon: <Terminal size={20} />, tech: ["Flutter", "Dart"] },
    { id: "cloud", name: "Integrações & Nuvem", icon: <Cpu size={20} />, tech: ["AWS", "Docker", "Node.js"] }
  ];

  const handlePlatformToggle = (id: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(id) 
        ? (prev.length > 1 ? prev.filter(p => p !== id) : prev) // keep at least one
        : [...prev, id]
    );
  };

  // Estimates based on selections
  const getTimelineWeeks = () => {
    const baseWeeks = 6;
    const platformMultiplier = selectedPlatforms.length * 3; // 3 weeks per platform since there are only 2 developers
    const complexityMultiplier = complexity === 1 ? 1 : complexity === 2 ? 1.8 : 3.0;
    return Math.round((baseWeeks + platformMultiplier) * complexityMultiplier);
  };

  const getComplexityLabel = () => {
    if (complexity === 1) return "Lançamento Rápido (M.V.P)";
    if (complexity === 2) return "Produto Completo de Alta Performance";
    return "Arquitetura Corporativa de Larga Escala";
  };

  const getCompiledTech = () => {
    const techSet = new Set<string>();
    selectedPlatforms.forEach(pId => {
      const p = platforms.find(pl => pl.id === pId);
      if (p) p.tech.forEach(t => techSet.add(t));
    });
    return Array.from(techSet);
  };

  const handleWhatsAppRedirect = (customMsg?: string) => {
    const baseText = customMsg || `Olá Atlas NS! Gostaria de fazer um orçamento comercial para um software sob demanda nas seguintes plataformas: ${selectedPlatforms.map(p => platforms.find(pl => pl.id === p)?.name).join(", ")}. Nível de complexidade desejado: ${getComplexityLabel()}.`;
    const encodedText = encodeURIComponent(baseText);
    const phoneNumber = "5511995995088"; // Updated commercial phone number
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, "_blank", "noopener,noreferrer");
  };

  const handleCopyToClipboard = () => {
    const summaryText = `Briefing de Projeto - Atlas NS\nPlataformas: ${selectedPlatforms.map(p => platforms.find(pl => pl.id === p)?.name).join(", ")}\nComplexidade: ${getComplexityLabel()}\nPrazo Estimado: ${getTimelineWeeks()} semanas\nTime Dedicado: 2 Desenvolvedores\nTecnologias Recomendadas: ${getCompiledTech().join(", ")}`;
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatIsTyping) return;

    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput("");
    setChatIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMsg }),
      });

      if (!response.ok) {
        throw new Error("Response was not ok");
      }

      const data = await response.json();
      const encodedMessage = encodeURIComponent(data.whatsappMessage);
      const phoneNumber = "5511995995088";
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

      setChatMessages(prev => [...prev, { 
        sender: 'agent', 
        text: data.text,
        whatsappUrl: whatsappUrl,
        buttons: data.buttons || []
      }]);
    } catch (error) {
      console.error("Chat error:", error);
      setChatMessages(prev => [...prev, { 
        sender: 'agent', 
        text: "Tive um problema de conexão rápida com meu servidor Gemini, mas você pode chamar a dupla diretamente no WhatsApp!",
        whatsappUrl: `https://wa.me/5511995995088?text=${encodeURIComponent("Olá Davi e Matias! Vim do chat da Atlas NS e gostaria de falar sobre meu projeto.")}`,
        buttons: ["whatsappButton"]
      }]);
    } finally {
      setChatIsTyping(false);
    }
  };

  return (
    <>
      {/* 1-Second Preloader Screen */}
      {preloaderActive && (
        <div className={`preloader ${preloaderFade ? "fade-out" : ""} ${preloaderAnim ? "animating" : ""}`}>
          <div className="preloader-content">
            <span className="preloader-symbol preloader-symbol-left">&lt;</span>
            <span className="preloader-symbol preloader-symbol-right">&gt;</span>
          </div>
        </div>
      )}

      {/* Floating/Moving Background Glow Blobs */}
      <div className="glow-blobs-container">
        <div className="glow-blob glow-blob-1" />
        <div className="glow-blob glow-blob-2" />
      </div>

      {/* Header / Navbar */}
      <header className="navbar">
        <div className="container nav-container">
          <a href="#hero" className="logo">
            <div className="logo-dot" />
            <span>Atlas NS</span>
            <span className="logo-divider">/</span>
            <span key={activeSection} className="logo-section">
              {activeSection === "hero" && "Início"}
              {activeSection === "services" && "Serviços"}
              {activeSection === "estimator" && "Simulador"}
              {activeSection === "team" && "Quem Somos"}
              {activeSection === "principles" && "Diferenciais"}
              {activeSection === "contact" && "Contato"}
            </span>
          </a>
          <nav>
            <ul className="nav-links">
              <li>
                <a href="#services" className={`nav-link ${activeSection === "services" ? "active" : ""}`}>
                  Serviços
                </a>
              </li>
              <li>
                <a href="#estimator" className={`nav-link ${activeSection === "estimator" ? "active" : ""}`}>
                  Simulador
                </a>
              </li>
              <li>
                <a href="#team" className={`nav-link ${activeSection === "team" ? "active" : ""}`}>
                  Quem Somos
                </a>
              </li>
              <li>
                <a href="#principles" className={`nav-link ${activeSection === "principles" ? "active" : ""}`}>
                  Diferenciais
                </a>
              </li>
              <li>
                <a href="#contact" className={`nav-link ${activeSection === "contact" ? "active" : ""}`}>
                  Contato
                </a>
              </li>
            </ul>
          </nav>
          <div className="navbar-cta">
            <button 
              onClick={() => handleWhatsAppRedirect()}
              className="btn btn-secondary"
            >
              Falar com Especialista
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="section">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="section-eyebrow">Sistemas Sob Demanda</span>
            <h1 className="hero-title">
              Tecnologia sob medida para <span className="hero-highlight">seu negócio crescer</span>.
            </h1>
            <p className="hero-subtitle">
              Somos uma boutique de desenvolvimento focada em entregar sistemas web, aplicativos móveis e soluções integradas. Sem gerentes de projeto burocráticos ou intermediários: você trabalha diretamente com os engenheiros fundadores do início ao fim.
            </p>
            <div className="hero-ctas">
              <button 
                onClick={() => handleWhatsAppRedirect()}
                className="btn btn-primary"
              >
                Falar com Especialista no WhatsApp
                <ChevronRight size={18} />
              </button>
              <a href="#estimator" className="btn btn-secondary">
                Simular Escopo do Projeto
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="neon-glow-bg" />
            <div className="stack-card">
              <div className="stack-header">
                <div className="stack-title">
                  <Code2 size={16} className="stack-item-icon" />
                  Especificações do Projeto
                </div>
                <div className="stack-indicator">
                  <div className="dot dot-active" />
                  <div className="dot dot-active" />
                  <div className="dot" />
                </div>
              </div>
              <div className="stack-list">
                <div className="stack-item">
                  <div className="stack-item-left">
                    <Globe size={18} className="stack-item-icon" />
                    <span className="stack-item-name">Plataformas Web</span>
                  </div>
                  <span className="stack-item-tag">Sistemas Web & SaaS</span>
                </div>
                <div className="stack-item">
                  <div className="stack-item-left">
                    <Smartphone size={18} className="stack-item-icon" />
                    <span className="stack-item-name">Celulares iOS & Android</span>
                  </div>
                  <span className="stack-item-tag">Aplicativos Nativos</span>
                </div>
                <div className="stack-item">
                  <div className="stack-item-left">
                    <Laptop size={18} className="stack-item-icon" />
                    <span className="stack-item-name">Sistemas para Computadores</span>
                  </div>
                  <span className="stack-item-tag">Windows, Linux & Mac</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section (Asymmetric Modern Layout) */}
      <section id="services" className="section section-alt">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-eyebrow">O que desenvolvemos</span>
            <h2 className="section-title">Soluções Digitais sob Medida para sua Empresa</h2>
            <p>Construímos aplicações robustas focadas em estabilidade, facilidade de uso e valor comercial real.</p>
          </div>

          {/* First Asymmetric Row */}
          <div className="asymmetric-grid">
            <div className="grid-card">
              <div>
                <div className="card-icon">
                  <Globe size={24} />
                </div>
                <h3 className="card-title">Plataformas Web & Portais de Venda</h3>
                <p className="card-desc">
                  Sistemas corporativos e portais de alta performance para automatizar seus processos operacionais, gerenciar vendas ou oferecer serviços de forma 100% online e integrada.
                </p>
              </div>
              <div className="card-stack">
                <span className="card-stack-tag">Tecnologia Web Moderna</span>
                <span className="card-stack-tag">Interfaces Responsivas</span>
                <span className="card-stack-tag">Painéis Administrativos</span>
              </div>
            </div>

            <div className="grid-card">
              <div>
                <div className="card-icon">
                  <Smartphone size={24} />
                </div>
                <h3 className="card-title">Aplicativos para Celular (iOS e Android)</h3>
                <p className="card-desc">
                  Garantimos a presença da sua marca no bolso dos seus clientes com aplicativos rápidos, intuitivos e integrados com todos os recursos dos smartphones.
                </p>
              </div>
              <div className="card-stack">
                <span className="card-stack-tag">Notificações Push</span>
                <span className="card-stack-tag">Câmera e Localização</span>
                <span className="card-stack-tag">Lojas da Apple & Google</span>
              </div>
            </div>
          </div>

          {/* Second Asymmetric Row */}
          <div className="asymmetric-grid grid-row-alt">
            <div className="grid-card">
              <div>
                <div className="card-icon">
                  <Laptop size={24} />
                </div>
                <h3 className="card-title">Sistemas Locais para Computadores</h3>
                <p className="card-desc">
                  Ferramentas focadas em performance extrema e integração com o sistema operacional local. Perfeito para softwares de PDV, painéis e ferramentas de uso diário.
                </p>
              </div>
              <div className="card-stack">
                <span className="card-stack-tag">Windows</span>
                <span className="card-stack-tag">macOS</span>
                <span className="card-stack-tag">Linux</span>
              </div>
            </div>

            <div className="grid-card">
              <div>
                <div className="card-icon">
                  <Cpu size={24} />
                </div>
                <h3 className="card-title">Integração de Sistemas & Banco de Dados</h3>
                <p className="card-desc">
                  Criamos as conexões necessárias para que seus sistemas atuais conversem entre si de forma segura, organizando seus bancos de dados e garantindo estabilidade nas nuvens AWS ou Google.
                </p>
              </div>
              <div className="card-stack">
                <span className="card-stack-tag">Segurança Avançada</span>
                <span className="card-stack-tag">Nuvem AWS / Google</span>
                <span className="card-stack-tag">Banco de Dados Seguro</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Platform Briefing Selector */}
      <section id="estimator" className="section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-eyebrow">Simulador de Projeto</span>
            <h2 className="section-title">Configure sua Ideia em Tempo Real</h2>
            <p>Selecione as plataformas onde seu software deve rodar e o nível de robustez desejado para ver uma estimativa de prazo.</p>
          </div>

          <div className="estimator-panel">
            <div className="estimator-config">
              <div>
                <h3 className="estimator-title">Onde seu sistema deve funcionar?</h3>
                <p className="estimator-subtitle">Você pode selecionar múltiplas opções</p>
              </div>
              
              <div className="platform-grid">
                {platforms.map(p => (
                  <div 
                    key={p.id}
                    onClick={() => handlePlatformToggle(p.id)}
                    className={`platform-checkbox ${selectedPlatforms.includes(p.id) ? "active" : ""}`}
                  >
                    <div className="checkbox-indicator">
                      {selectedPlatforms.includes(p.id) && <CheckCircle2 size={12} className="checkbox-check" />}
                    </div>
                    {p.icon}
                    <span className="platform-checkbox-text">{p.name}</span>
                  </div>
                ))}
              </div>

              <div className="complexity-control">
                <div className="complexity-labels">
                  <span>Robustez e Complexidade</span>
                  <span className="text-primary font-semibold">{getComplexityLabel()}</span>
                </div>
                <input 
                  type="range"
                  min="1"
                  max="3"
                  value={complexity}
                  onChange={(e) => setComplexity(parseInt(e.target.value))}
                  className="complexity-slider"
                />
                <div className="complexity-labels text-xs text-zinc-500">
                  <span>Validação Rápida</span>
                  <span>Produto Completo</span>
                  <span>Escalabilidade Máxima</span>
                </div>
              </div>
            </div>

            <div className="estimator-output">
              <div>
                <div className="output-title">
                  <Terminal size={14} />
                  Resumo das Especificações
                </div>
                <div className="output-stats">
                  <div className="stat-group">
                    <span className="stat-label">Prazo Projetado</span>
                    <span className="stat-val">{getTimelineWeeks()} semanas</span>
                  </div>
                  <div className="stat-group">
                    <span className="stat-label">Time Dedicado</span>
                    <span className="stat-val">2 Especialistas Seniores</span>
                  </div>
                  <div>
                    <span className="stat-label block mb-2">Tecnologias Recomendadas</span>
                    <div className="stat-tech-stack">
                      {getCompiledTech().map(t => (
                        <span key={t} className="tech-pill">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                <button 
                  onClick={() => handleWhatsAppRedirect()}
                  className="btn btn-success"
                  style={{ width: "100%" }}
                >
                  Enviar Simulação no WhatsApp
                  <ChevronRight size={18} />
                </button>
                <button 
                  onClick={handleCopyToClipboard}
                  className="btn btn-copy"
                  style={{ width: "100%" }}
                >
                  {copied ? "Copiado!" : "Copiar Resumo"}
                  {copied ? <CheckCircle2 size={16} /> : <Code2 size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 2 Developers Profile Section */}
      <section id="team" className="section section-alt">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-eyebrow">Quem Desenvolve Seu Projeto</span>
            <h2 className="section-title">Comunicação Direta com os Fundadores</h2>
            <p>Acreditamos em times enxutos de alta performance. Seu software será programado exclusivamente por nós, sem intermediários.</p>
          </div>

          <div className="team-layout">
            {/* Developer 1: Davi */}
            <div className="team-card">
              <div className="team-avatar-wrapper">
                <Image 
                  src="/davi.jpg" 
                  alt="Davi - Lead Frontend & UI/UX" 
                  fill 
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 140px, 140px"
                />
              </div>
              <div className="team-info">
                <span className="team-role">Frontend & Design UI/UX</span>
                <h3 className="team-name">Davi</h3>
                <span className="team-course">Cursando Engenharia de Software na FIAP</span>
                <p className="team-desc">
                  Especialista em criar layouts modernos, responsivos e dinâmicos. Trabalha com Next.js, React e React Native para garantir que a interface seja fluida, elegante e focada na conversão de leads.
                </p>
                <div className="team-skills">
                  <span className="tech-pill">Next.js</span>
                  <span className="tech-pill">React Native</span>
                  <span className="tech-pill">Tailwind CSS</span>
                  <span className="tech-pill">Figma</span>
                </div>
              </div>
            </div>

            {/* Developer 2: Matias */}
            <div className="team-card">
              <div className="team-avatar-wrapper">
                <Image 
                  src="/matias.png" 
                  alt="Matias - Desenvolvedor Fullstack" 
                  fill 
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 140px, 140px"
                />
              </div>
              <div className="team-info">
                <span className="team-role">Desenvolvedor Fullstack</span>
                <h3 className="team-name">Matias</h3>
                <span className="team-course">Cursando Engenharia de Software na PUC-Campinas</span>
                <p className="team-desc">
                  Especialista em criar soluções ponta a ponta robustas. Desenvolve aplicações móveis e desktop nativas com Flutter/Dart, APIs escaláveis com Node.js e Python (Django), além de gerenciar modelagem de dados e infraestrutura AWS/Docker.
                </p>
                <div className="team-skills">
                  <span className="tech-pill">Flutter</span>
                  <span className="tech-pill">Node.js</span>
                  <span className="tech-pill">Python / Django</span>
                  <span className="tech-pill">Docker / AWS</span>
                  <span className="tech-pill">PostgreSQL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Difference / Principles (No generic lists) */}
      <section id="principles" className="section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-eyebrow">Diferenciais Clave</span>
            <h2 className="section-title">Parceria focada em resultados reais</h2>
            <p>Criamos software de forma transparente, garantindo segurança jurídica e técnica para o seu negócio.</p>
          </div>

          <div className="principles-layout">
            <div className="principle-item">
              <span className="principle-num">// 01</span>
              <h3 className="principle-title">Propriedade Total da sua Empresa</h3>
              <p className="principle-body">
                Após a entrega, o código pertence 100% à sua empresa. Sem taxas de licenciamento recorrentes ou dependências comerciais do nosso time.
              </p>
            </div>
            <div className="principle-item">
              <span className="principle-num">// 02</span>
              <h3 className="principle-title">Garantia Técnica e Testes</h3>
              <p className="principle-body">
                Garantimos que o sistema funcione exatamente como planejado. Cada módulo entregue passa por rotinas rígidas de qualidade e testes de usabilidade.
              </p>
            </div>
            <div className="principle-item">
              <span className="principle-num">// 03</span>
              <h3 className="principle-title">Entregas Semanais de Protótipos</h3>
              <p className="principle-body">
                Trabalhamos com metodologias ativas. Você acompanha e valida protótipos funcionais semana a semana, vendo seu projeto evoluir em tempo real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Conversion Section */}
      <section id="contact" className="section section-alt">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-text">
              <span className="section-eyebrow">Pronto para Começar?</span>
              <h2 className="cta-title">Tire seu Projeto do Papel com Segurança Técnica</h2>
              <p>
                Conecte-se com nossa equipe de desenvolvedores agora para esclarecer dúvidas e receber um escopo inicial com estimativa de investimento.
              </p>
            </div>
            <div className="cta-action">
              <button 
                onClick={() => handleWhatsAppRedirect()}
                className="btn btn-success"
              >
                Falar com a Equipe no WhatsApp
              </button>
              <div className="cta-benefits">
                <div className="cta-benefit">
                  <CheckCircle2 size={14} className="cta-benefit-icon" />
                  <span>Estudo de viabilidade gratuito</span>
                </div>
                <div className="cta-benefit">
                  <CheckCircle2 size={14} className="cta-benefit-icon" />
                  <span>Código sob medida para sua operação</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-container">
          <div>
            <p className="text-xs">© {new Date().getFullYear()} Atlas NS. Todos os direitos reservados. CNPJ: 00.000.000/0001-00</p>
          </div>
          <div>
            <p className="text-xs">
              Interface em conformidade com as diretrizes de acessibilidade e performance técnica de carregamento rápido.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Widget */}
      <div className="chat-widget">
        {chatOpen ? (
          <div className="chat-window">
            <div className="chat-header">
              <div className="chat-header-info">
                <div className="avatar">
                  AY
                  <div className={`avatar-online ${isOnline ? "" : "avatar-offline"}`} />
                </div>
                <div className="chat-header-text">
                  <h4>Ayla | Atlas NS</h4>
                  <p>{isOnline ? "Online para suporte comercial" : "Fora do horário comercial (08h às 16h)"}</p>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="chat-close-btn">
                <X size={20} />
              </button>
            </div>

            <div className="chat-body" ref={chatBodyRef}>
              {chatMessages.map((msg, i) => (
                <div key={i} className="chat-message-wrapper" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <div 
                    className={`chat-msg ${msg.sender === 'agent' ? 'chat-msg-received' : 'chat-msg-sent'}`}
                  >
                    {msg.text}
                    
                    {msg.buttons && msg.buttons.length > 0 && (
                      <div className="chat-buttons-container" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                        {msg.buttons.map(btnType => {
                          if (btnType === "whatsappButton" && msg.whatsappUrl) {
                            return (
                              <a 
                                key={btnType}
                                href={msg.whatsappUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="chat-cta-btn btn-success-chat"
                              >
                                Conversar com os Devs no WhatsApp
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                              </a>
                            );
                          }
                          if (btnType === "portfolioMatias") {
                            return (
                              <a 
                                key={btnType}
                                href="https://allanmatias.vercel.app" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="chat-cta-btn btn-secondary-chat"
                              >
                                Ver Portfólio do Matias
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                              </a>
                            );
                          }
                          if (btnType === "portfolioDavi") {
                            return (
                              <a 
                                key={btnType}
                                href="https://github.com/davibalieiro" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="chat-cta-btn btn-secondary-chat"
                              >
                                Ver GitHub do Davi
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                              </a>
                            );
                          }
                          return null;
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {chatIsTyping && (
                <div className="chat-msg chat-msg-received" style={{ display: 'flex', flexDirection: 'column', gap: '6px', opacity: 0.9 }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    {typingText}
                  </span>
                  <div className="typing-indicator" style={{ display: 'flex', gap: '4px', padding: '4px 0' }}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
            </div>

            <div className="chat-footer">
              <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="text" 
                  placeholder="Escreva sua mensagem..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  style={{ 
                    flex: 1, 
                    padding: '8px 12px', 
                    borderRadius: 'var(--radius-sm)', 
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--bg-base)',
                    color: 'var(--text-primary)',
                    fontSize: '0.85rem'
                  }}
                />
                <button 
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: '8px 16px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  disabled={chatIsTyping}
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div onClick={() => setChatOpen(true)} className="chat-bubble">
            <div className="chat-badge" />
            <MessageSquare size={24} />
          </div>
        )}
      </div>
    </>
  );
}
