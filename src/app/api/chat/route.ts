// import { NextRequest } from "next/server";

import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  return new Response("Chat API is disabled", { status: 404 });
  /*
  try {
    const { message } = await request.json();

    if (!message) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Mock response if no API key is provided
      const mockText = `Olá! Somos uma equipe focada em entregas diretas e ágeis. Eu (Matias) cuido do Fullstack/Flutter e o Davi comanda o Frontend/UI. Vamos falar sobre seu projeto diretamente no WhatsApp!`;

      const mockWhatsapp = `Olá Davi e Matias! Vim do site da Atlas e gostaria de conversar sobre o desenvolvimento do meu sistema. Minha ideia é: "${message}"`;

      return Response.json({
        text: mockText,
        whatsappMessage: mockWhatsapp,
        buttons: ["whatsappButton"],
      });
    }

    const systemPrompt = `Você é a Ayla, Assistente Comercial Virtual da software house "Atlas".
A Atlas é formada por exatamente dois desenvolvedores seniores que cuidam de todo o desenvolvimento diretamente com os clientes:
1. Davi (Desenvolvedor Frontend & UI/UX).
2. Matias (Desenvolvedor Fullstack especializado em Backend).

Sua resposta deve ser curta, direta, acolhedora e focada em conversão (CTA) para o WhatsApp.

Você DEVE responder estritamente em formato JSON válido com a seguinte estrutura:
{
  "text": "A resposta curta e persuasiva (máximo 2 parágrafos simples e diretos) que aparecerá no chat.",
  "whatsappMessage": "Uma mensagem pré-formatada para o WhatsApp que o usuário enviará no privado dos devs, baseada na conversa. Exemplo: 'Olá Davi e Matias! Vim do site da Atlas e gostaria de conversar sobre meu projeto...'",
  "buttons": ["whatsappButton"]
}

No campo "buttons", você deve incluir:
- 'whatsappButton' (sempre inclua se houver intenção comercial ou de contato).

Mensagem do usuário: "${message}"`;

    const apiURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const apiResponse = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: systemPrompt,
              },
            ],
          },
        ],
      }),
    });

    if (!apiResponse.ok) {
      const errText = await apiResponse.text();
      console.error("Gemini API error:", errText);
      throw new Error(`Gemini API returned status ${apiResponse.status}`);
    }

    const data = await apiResponse.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error("No content generated from Gemini API");
    }

    const parsedData = JSON.parse(generatedText.trim());
    return Response.json(parsedData);
  } catch (error) {
    console.error("Error in chat API route:", error);
    // Fallback response on error
    const fallbackText =
      "Olá! Excelente iniciativa de projeto. Vamos alinhar todos os detalhes diretamente com a equipe no WhatsApp?";
    const fallbackWhatsapp =
      "Olá Davi e Matias! Vim do site da Atlas e gostaria de falar sobre meu projeto.";
    return Response.json({
      text: fallbackText,
      whatsappMessage: fallbackWhatsapp,
      buttons: ["whatsappButton"],
    });
  }
  */
}
