"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function CookieConsent() {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("atlas_cookie_consent");
    if (!consent) {
      // Small delay for entrance animation
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("atlas_cookie_consent", "accepted");
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("atlas_cookie_consent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-consent-banner">
      <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
        <div style={{ 
          color: "var(--color-primary)", 
          marginTop: "2px",
          display: "flex",
          padding: "6px",
          backgroundColor: "rgba(157, 85, 255, 0.1)",
          borderRadius: "8px",
          border: "1px solid rgba(157, 85, 255, 0.2)"
        }}>
          <ShieldCheck size={20} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>
            Controle de Privacidade (LGPD)
          </h4>
          <p className="cookie-consent-text">
            Utilizamos cookies essenciais para o funcionamento do site e do chat inteligente. Ao clicar em &quot;Aceitar&quot;, você concorda com o uso de cookies e o processamento de mensagens no assistente comercial. Consulte nossa{" "}
            <Link href="/politica-de-privacidade">Política de Privacidade</Link> para saber mais.
          </p>
        </div>
      </div>
      <div className="cookie-consent-buttons">
        <button 
          onClick={handleReject} 
          className="cookie-btn cookie-btn-reject"
        >
          Rejeitar
        </button>
        <button 
          onClick={handleAccept} 
          className="cookie-btn cookie-btn-accept"
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}
