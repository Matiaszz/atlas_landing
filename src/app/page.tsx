"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import AtlasLogo from "./components/ui/AtlasLogo";
import { 
  Smartphone, 
  Laptop, 
  Globe, 
  Cpu, 
  Code2, 
  MessageSquare, 
  Send, 
  X, 
  ChevronRight, 
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

export default function Home() {
  // Preloader states
  const [preloaderActive, setPreloaderActive] = useState<boolean>(true);
  const [preloaderAnim, setPreloaderAnim] = useState<boolean>(false);
  const [preloaderFade, setPreloaderFade] = useState<boolean>(false);

  // State for active navbar section
  const [activeSection, setActiveSection] = useState<string>("hero");

  // FAQ accordion active state
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Contact Form states
  const [contactName, setContactName] = useState<string>("");
  const [contactProjectType, setContactProjectType] = useState<string>("website");
  const [contactDescription, setContactDescription] = useState<string>("");

  // FAQ static data
  const faqItems = [
    {
      question: "Como funciona o processo de desenvolvimento de vocês?",
      answer: "Nós trabalhamos de forma ágil e transparente. O projeto é estruturado em entregas semanais, onde você homologa telas funcionais e acompanha o progresso em tempo real, sem surpresas no final."
    },
    {
      question: "Quanto tempo leva para o meu projeto ficar pronto?",
      answer: "O prazo depende da complexidade do projeto. MVPs de validação rápida costumam levar entre 3 a 5 semanas, enquanto plataformas web e sistemas corporativos complexos podem levar de 8 a 12 semanas."
    },
    {
      question: "Vocês dão suporte após o lançamento do software?",
      answer: "Com certeza! Oferecemos garantia completa de correção de bugs após o lançamento e planos flexíveis de suporte, manutenção e evolução contínua para acompanhar o crescimento do seu negócio."
    },
    {
      question: "Eu terei acesso ao código-fonte do meu projeto?",
      answer: "Sim, 100%. Todo o código-fonte desenvolvido pertence integralmente à sua empresa. Compartilhamos o repositório no GitHub desde o primeiro dia, garantindo total transparência e propriedade intelectual."
    },
    {
      question: "Quais tecnologias vocês utilizam no desenvolvimento?",
      answer: "Utilizamos stacks modernas de altíssimo desempenho: Next.js/React para plataformas web, Flutter para aplicativos móveis nativos (iOS e Android), Node.js/Java para APIs robustas e escaláveis, e infraestrutura em nuvem com AWS e Docker."
    }
  ];

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
  const [mounted, setMounted] = useState<boolean>(false);

  // Ref for chat window scrolling
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Sidebar drag-to-resize state and logic
  const [sidebarWidth, setSidebarWidth] = useState<number>(420);

  // Hero section mouse spotlight states
  const [heroMousePos, setHeroMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [heroHovered, setHeroHovered] = useState<boolean>(false);

  const handleHeroMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setHeroMousePos({ x, y });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      // Sidebar is on the right, so dragging left (smaller clientX) increases width
      const newWidth = window.innerWidth - moveEvent.clientX;
      if (newWidth >= 320 && newWidth <= window.innerWidth * 0.7) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Determine online status based on mount state to avoid Next.js hydration mismatch
  const getOnlineStatus = () => {
    if (!mounted) return true; // server-side default
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    return day >= 1 && day <= 5 && hour >= 8 && hour < 16;
  };
  const isOnline = getOnlineStatus();

  // Auto-scroll to bottom of chat on new messages or typing state changes
  useEffect(() => {
    if (chatOpen && chatEndRef.current) {
      const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      };
      
      const scrollTimeout = setTimeout(scrollToBottom, 50);
      return () => clearTimeout(scrollTimeout);
    }
  }, [chatMessages, chatIsTyping, chatOpen]);

  // Set mounted state and initialize welcome message
  useEffect(() => {
    // Defer state update to next execution cycle to avoid synchronous setState inside effect warning
    const mountTimer = setTimeout(() => {
      setMounted(true);
    }, 0);
    
    const welcomeTimer = setTimeout(() => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      const online = day >= 1 && day <= 5 && hour >= 8 && hour < 16;
      
      const statusText = online 
        ? "estamos ONLINE e prontos para conversar!"
        : "estamos OFFLINE no momento (nosso horário comercial é de Segunda a Sexta, das 08h às 16h), mas você já pode deixar sua ideia registrada!";

      setChatMessages([
        {
          sender: 'agent',
          text: `Olá! Eu sou a Ayla, a assistente comercial inteligente da Atlas. No momento, ${statusText} Qual sistema você deseja construir hoje?`,
          buttons: ['whatsappButton'],
          whatsappUrl: `https://wa.me/5511995995088?text=${encodeURIComponent("Olá Davi e Matias! Vim do site da Atlas e gostaria de iniciar um projeto.")}`
        }
      ]);
    }, 0);
    
    return () => {
      clearTimeout(mountTimer);
      clearTimeout(welcomeTimer);
    };
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
    const sections = ["hero", "services", "team", "principles", "faq", "contact"];
    
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

  const handleWhatsAppRedirect = (customMsg?: string) => {
    const baseText = customMsg || "Olá Atlas! Gostaria de fazer um orçamento comercial para um software sob demanda para minha empresa.";
    const encodedText = encodeURIComponent(baseText);
    const phoneNumber = "5511995995088";
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, "_blank", "noopener,noreferrer");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let projectTypeLabel = "";
    if (contactProjectType === "website") projectTypeLabel = "Website / Plataforma Web";
    else if (contactProjectType === "mobile") projectTypeLabel = "Aplicativo Mobile (iOS & Android)";
    else if (contactProjectType === "desktop") projectTypeLabel = "Aplicativo Desktop";
    else if (contactProjectType === "API") projectTypeLabel = "API / Integração / Backend";

    let message = `Olá Atlas! Me chamo ${contactName}. Gostaria de solicitar um orçamento comercial para um projeto do tipo: ${projectTypeLabel}.`;
    
    if (contactDescription.trim()) {
      message += `\n\nDetalhes do projeto:\n${contactDescription.trim()}`;
    }
    
    handleWhatsAppRedirect(message);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatIsTyping) return;

    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput("");
    
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
        whatsappUrl: `https://wa.me/5511995995088?text=${encodeURIComponent("Olá Davi e Matias! Vim do chat da Atlas e gostaria de falar sobre meu projeto.")}`,
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
            <AtlasLogo size={32} />
            <span>Atlas</span>
            <span className="logo-divider">/</span>
            <span key={activeSection} className="logo-section">
              {activeSection === "hero" && "Início"}
              {activeSection === "services" && "Serviços"}
              {activeSection === "faq" && "FAQ"}
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
                <a href="#faq" className={`nav-link ${activeSection === "faq" ? "active" : ""}`}>
                  FAQ
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
      <section 
        id="hero"
        onMouseMove={handleHeroMouseMove}
        onMouseEnter={() => setHeroHovered(true)}
        onMouseLeave={() => setHeroHovered(false)}
        style={{
          ...({
            "--mouse-x": `${heroMousePos.x}px`,
            "--mouse-y": `${heroMousePos.y}px`,
          } as React.CSSProperties)
        }}
      >
        <div className="grid-bg-overlay" />
        <div className={`grid-bg-overlay-interactive ${heroHovered ? "active" : ""}`} />
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="section-eyebrow">Sistemas Sob Demanda</span>
            <h1 className="hero-title">
              Tecnologia sob medida para <span className="hero-highlight">seu negócio crescer</span>.
            </h1>
            <p className="hero-subtitle">
                Desenvolvemos sistemas, sites e aplicações sob medida para empresas que querem digitalizar processos, aumentar resultados e crescer com tecnologia. Cada projeto é construído de forma personalizada para atender às necessidades do seu negócio.
            </p>
            <div className="hero-ctas">
              <button 
                onClick={() => handleWhatsAppRedirect()}
                className="btn btn-primary"
              >
                Falar com Especialista no WhatsApp
                <ChevronRight size={18} />
              </button>
              <a href="#contact" className="btn btn-secondary">
                Solicitar Orçamento
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
                </div>
                <div className="stack-item">
                  <div className="stack-item-left">
                    <Smartphone size={18} className="stack-item-icon" />
                    <span className="stack-item-name">Celulares iOS & Android</span>
                  </div>
                </div>
                <div className="stack-item">
                  <div className="stack-item-left">
                    <Laptop size={18} className="stack-item-icon" />
                    <span className="stack-item-name">Sistemas para Computadores</span>
                  </div>  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Wrapper (covers everything below Hero) */}
      <div className="main-content-wrapper">
        <div className="global-dots-bg" />

        {/* Services Section (Asymmetric Bento Box Grid Layout) */}
        <section id="services" className="section section-alt">
          <div className="ambient-purple-glow" />
          <div className="container">
          <div className="section-title-wrapper">
            <span className="section-eyebrow">O que desenvolvemos</span>
            <h2 className="section-title">Soluções Digitais sob Medida para sua Empresa</h2>
            <p>Construímos aplicações robustas focadas em estabilidade, facilidade de uso e valor comercial real.</p>
          </div>

          <div className="services-split-layout">
            <div className="services-left-col">
              <div className="bento-grid">
                {/* Card 1: Web (spans 2 columns on desktop) */}
                <div className="bento-card card-large">
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
                    <span className="card-stack-tag">Next.js</span>
                    <span className="card-stack-tag">React</span>
                    <span className="card-stack-tag">Node.js</span>
                    <span className="card-stack-tag">PostgreSQL</span>
                  </div>
                </div>

                {/* Card 2: Mobile (spans 1 column on desktop) */}
                <div className="bento-card card-small">
                  <div>
                    <div className="card-icon">
                      <Smartphone size={24} />
                    </div>
                    <h3 className="card-title">Aplicativos Móveis</h3>
                    <p className="card-desc">
                      Presença garantida no bolso dos seus clientes com aplicativos nativos iOS e Android rápidos, integrados e otimizados para as lojas.
                    </p>
                  </div>
                  <div className="card-stack">
                    <span className="card-stack-tag">Flutter</span>
                    <span className="card-stack-tag">Dart</span>
                    <span className="card-stack-tag">Firebase</span>
                  </div>
                </div>

                {/* Card 3: Desktop Apps (spans 1 column on desktop) */}
                <div className="bento-card card-small">
                  <div>
                    <div className="card-icon">
                      <Laptop size={24} />
                    </div>
                    <h3 className="card-title">Sistemas Desktop</h3>
                    <p className="card-desc">
                      Performance extrema e integrações locais com o sistema operacional para PDVs, totens de atendimento e ferramentas de uso diário.
                    </p>
                  </div>
                  <div className="card-stack">
                    <span className="card-stack-tag">Flutter</span>
                    <span className="card-stack-tag">Windows</span>
                    <span className="card-stack-tag">Linux</span>
                  </div>
                </div>

                {/* Card 4: Cloud & Integrations (spans 2 columns on desktop) */}
                <div className="bento-card card-large">
                  <div>
                    <div className="card-icon">
                      <Cpu size={24} />
                    </div>
                    <h3 className="card-title">Integrações & Nuvem</h3>
                    <p className="card-desc">
                      Sincronização de sistemas, bancos de dados escaláveis e APIs robustas integradas de forma segura e estável sob arquitetura AWS, Docker ou Firebase.
                    </p>
                  </div>
                  <div className="card-stack">
                    <span className="card-stack-tag">AWS</span>
                    <span className="card-stack-tag">Docker</span>
                    <span className="card-stack-tag">Node.js</span>
                    <span className="card-stack-tag">APIs REST</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-visual animate-on-scroll fade-in">
              <div className="geometric-shape shape-1"></div>
              <div className="geometric-shape shape-2"></div>
                <div className="glass-card-abstract">
                  <div className="code-line w-70"></div>
                  <div className="code-line w-50"></div>
                  <div className="code-line w-90"></div>
                  <div className="code-line w-60"></div>
                </div>
            </div>          
          </div>
        </div>
      </section>

      {/* FAQ was moved down */}

      {/* The 2 Developers Profile Section */}
      <section id="team" className="section">
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
                  src="/davi.png" 
                  alt="Davi - Lead Frontend & UI/UX" 
                  fill 
                  className="team-avatar-img"
                  sizes="(max-width: 768px) 140px, 140px"
                />
              </div>
              <div className="team-info">
                <span className="team-role">Frontend & Design UI/UX</span>
                <h3 className="team-name">Davi</h3>
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
                  className="team-avatar-img"
                  sizes="(max-width: 768px) 140px, 140px"
                />
              </div>
              <div className="team-info">
                <span className="team-role">Desenvolvedor Fullstack</span>
                <h3 className="team-name">Matias</h3>
                <p className="team-desc">
                  Especialista em criar soluções ponta a ponta robustas. Desenvolve aplicações móveis e desktop nativas com Flutter/Dart, APIs escaláveis com Node.js e Java (Spring Boot), além de gerenciar modelagem de dados e infraestrutura AWS/Docker.
                </p>
                <div className="team-skills">
                  <span className="tech-pill">Flutter</span>
                  <span className="tech-pill">Node.js</span>
                  <span className="tech-pill">Java / Spring Boot</span>
                  <span className="tech-pill">Docker / AWS</span>
                  <span className="tech-pill">PostgreSQL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Difference / Principles (No generic lists) */}
      <section id="principles" className="section section-alt">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-eyebrow">Diferenciais Clave</span>
            <h2 className="section-title">Parceria focada em resultados reais</h2>
            <p>Criamos software de forma transparente, garantindo segurança jurídica e técnica para o seu negócio.</p>
          </div>

          <div className="principles-layout">
            <div className="principle-item">
              <span className="principle-num">{"// 01"}</span>
              <h3 className="principle-title">Propriedade Total da sua Empresa</h3>
              <p className="principle-body">
                Após a entrega, o código pertence 100% à sua empresa. Sem taxas de licenciamento recorrentes ou dependências comerciais do nosso time.
              </p>
            </div>
            <div className="principle-item">
              <span className="principle-num">{"// 02"}</span>
              <h3 className="principle-title">Garantia Técnica e Testes</h3>
              <p className="principle-body">
                Garantimos que o sistema funcione exatamente como planejado. Cada módulo entregue passa por rotinas rígidas de qualidade e testes de usabilidade.
              </p>
            </div>
            <div className="principle-item">
              <span className="principle-num">{"// 03"}</span>
              <h3 className="principle-title">Entregas Semanais de Protótipos</h3>
              <p className="principle-body">
                Trabalhamos com metodologias ativas. Você acompanha e valida protótipos funcionais semana a semana, vendo seu projeto evoluir em tempo real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-eyebrow">Dúvidas Frequentes</span>
            <h2 className="section-title">Perguntas Mais Comuns</h2>
            <p>Esclareça suas principais dúvidas sobre como trabalhamos, prazos e tecnologia.</p>
          </div>

          <div className="faq-wrapper">
            {faqItems.map((item, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index} 
                  className={`faq-item ${isOpen ? "active" : ""}`}
                >
                  <button 
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="faq-question"
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    <ChevronDown size={18} className="faq-icon" />
                  </button>
                  <div className="faq-answer">
                    <div className="faq-answer-content">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
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
              
              <div className="cta-benefits">
                <div className="cta-benefit">
                  <CheckCircle2 size={14} className="cta-benefit-icon" />
                  <span>Estudo de viabilidade gratuito</span>
                </div>
                <div className="cta-benefit">
                  <CheckCircle2 size={14} className="cta-benefit-icon" />
                  <span>Código sob medida para sua operação</span>
                </div>
                <div className="cta-benefit">
                  <CheckCircle2 size={14} className="cta-benefit-icon" />
                  <span>Sem intermediários ou burocracia</span>
                </div>
              </div>
            </div>

            <div className="cta-action">
              <form onSubmit={handleFormSubmit} className="cta-form">
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">Seu Nome</label>
                  <input 
                    type="text"
                    id="contact-name"
                    name="name"
                    placeholder="Como gostaria de ser chamado?"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Tipo de Projeto</label>
                  <div className="project-type-selector">
                    {[
                      { id: "website", label: "Website / Web" },
                      { id: "mobile", label: "Mobile (App)" },
                      { id: "desktop", label: "Desktop" },
                      { id: "API", label: "API / Backend" }
                    ].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setContactProjectType(type.id)}
                        className={`type-chip ${contactProjectType === type.id ? "active" : ""}`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-description" className="form-label">Conte um pouco mais (opcional)</label>
                  <textarea 
                    id="contact-description"
                    name="description"
                    placeholder="Quais são as principais ideias ou objetivos do projeto?"
                    value={contactDescription}
                    onChange={(e) => setContactDescription(e.target.value)}
                    className="form-textarea"
                    rows={3}
                  />
                </div>

                <button 
                  type="submit"
                  className="btn btn-success form-submit-btn"
                >
                  Falar com a Equipe no WhatsApp
                  <ChevronRight size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>

    {/* Footer */}
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand-col">
          <div className="footer-logo">
            <AtlasLogo size={24} />
            <span>Atlas</span>
          </div>
          <p className="footer-tagline">
            Desenvolvimento ágil e de alta performance para sistemas sob demanda. Sem intermediários, trabalhando diretamente com os engenheiros fundadores do início ao fim.
          </p>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-col-title">Navegação</h4>
          <ul className="footer-links">
            <li><a href="#services">Serviços</a></li>
            <li><a href="#team">Quem Somos</a></li>
            <li><a href="#principles">Diferenciais</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact">Contato</a></li>
          </ul>
        </div>

        <div className="footer-contact-col">
          <h4 className="footer-col-title">Contato & Suporte</h4>
          <ul className="footer-contact-info">
            <li>
              <span className="info-label">WhatsApp Comercial:</span>
              <a href="https://wa.me/5511995995088" target="_blank" rel="noopener noreferrer" className="footer-contact-link">
                +55 (11) 99599-5088
              </a>
            </li>
            <li>
              <span className="info-label">Operação:</span>
              <span className="footer-text">Salto - SP, Brasil</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <div className="footer-divider" />
        <div className="footer-bottom-wrapper">
          <p className="text-xs">
            © {new Date().getFullYear()} Atlas. Todos os direitos reservados.
          </p>
          
        </div>
      </div>
    </footer>

      {/* Floating WhatsApp Widget */}
      <div className="chat-widget">
        <div 
          className={`chat-window ${chatOpen ? "chat-window-open" : ""}`}
          style={{ width: `${sidebarWidth}px` }}
        >
          {/* Custom drag-to-resize handle on left edge */}
          <div 
            className="sidebar-resize-handle"
            onMouseDown={handleMouseDown}
          />
          <div className="chat-header">
            <div className="chat-header-info">
              <AtlasLogo></AtlasLogo>
              <div className="chat-header-text">
                <h4>Ayla | Atlas</h4>
                <p>{isOnline ? "Online para suporte comercial" : "Fora do horário comercial (08h às 16h)"}</p>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} className="chat-close-btn">
              <X size={20} />
            </button>
          </div>

          <div className="chat-body">
            {chatMessages.map((msg, i) => (
              <div key={i} className="chat-message-wrapper">
                <div 
                  className={`chat-msg ${msg.sender === 'agent' ? 'chat-msg-received' : 'chat-msg-sent'}`}
                >
                  {msg.text}
                  
                  {msg.buttons && msg.buttons.length > 0 && (
                    <div className="chat-buttons-container">
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
                        return null;
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {chatIsTyping && (
              <div className="chat-msg chat-msg-received chat-msg-typing">
                <span className="chat-typing-status">
                  {typingText}
                </span>
                <div className="chat-typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            {/* Dynamic scroll anchor */}
            <div ref={chatEndRef} />
          </div>

          <div className="chat-footer">
            <form onSubmit={handleSendMessage} className="chat-footer-form">
              <input 
                type="text" 
                id="chat-message-input"
                name="chatMessage"
                title="Escreva sua mensagem"
                aria-label="Escreva sua mensagem"
                placeholder="Escreva sua mensagem..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="chat-footer-input"
              />
              <button 
                type="submit"
                className="btn btn-primary chat-footer-btn"
                disabled={chatIsTyping}
                title="Enviar mensagem"
                aria-label="Enviar mensagem"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>

        <div 
          onClick={() => setChatOpen(true)} 
          className={`chat-bubble ${chatOpen ? "chat-bubble-hidden" : ""}`}
        >
          <div className="chat-badge" />
          <MessageSquare size={24} />
        </div>
      </div>
    </>
  );
}
