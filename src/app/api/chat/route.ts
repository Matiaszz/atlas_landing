import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Mock response if no API key is provided
      const mockText = `Olá! Somos uma dupla de desenvolvedores focados em entregas diretas e ágeis. Eu (Matias) cuido do Fullstack/Flutter e o Davi comanda o Frontend/UI. Vamos falar sobre seu projeto diretamente no WhatsApp ou você pode ver nossos trabalhos nos links abaixo!`;

      const mockWhatsapp = `Olá Davi e Matias! Vim do site da Atlas NS e gostaria de conversar sobre o desenvolvimento do meu sistema. Minha ideia é: "${message}"`;

      return Response.json({
        text: mockText,
        whatsappMessage: mockWhatsapp,
        buttons: ["whatsappButton", "portfolioMatias", "portfolioDavi"],
      });
    }

    const systemPrompt = `Você é a Ayla, Assistente Comercial Virtual da software house "Atlas NS".
A Atlas NS é formada por exatamente dois desenvolvedores que cuidam de todo o desenvolvimento diretamente com os clientes:
1. Davi (Desenvolvedor Frontend & UI/UX, estuda Engenharia de Software na FIAP, GitHub: https://github.com/davibalieiro).
2. Matias (Desenvolvedor Fullstack especializado em Backend, estuda Engenharia de Software na PUC Campinas, site pessoal: allanmatias.vercel.app).

Sua resposta deve ser curta, direta, acolhedora e focada em conversão (CTA) para o WhatsApp.

Você DEVE responder estritamente em formato JSON válido com a seguinte estrutura:
{
  "text": "A resposta curta e persuasiva (máximo 2 parágrafos simples e diretos) que aparecerá no chat.",
  "whatsappMessage": "Uma mensagem pré-formatada para o WhatsApp que o usuário enviará no privado dos devs, baseada na conversa. Exemplo: 'Olá Davi e Matias! Vim do site da Atlas NS e gostaria de conversar sobre meu projeto...'",
  "buttons": ["whatsappButton", "portfolioMatias", "portfolioDavi"]
}

No campo "buttons", você deve decidir dinamicamente quais botões de ação exibir abaixo da mensagem. Adicione:
- 'whatsappButton' (sempre inclua se houver intenção comercial ou de contato).
- 'portfolioMatias' (inclua se o usuário perguntar sobre o Matias, sobre o backend, mobile ou pedir portfólio/sites).
- 'portfolioDavi' (inclua se o usuário perguntar sobre o Davi, frontend, design UI/UX ou pedir portfólio/sites).

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
        generationConfig: {
          responseMimeType: "application/json",
        },
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
      "Olá Davi e Matias! Vim do site do Atlas NS e gostaria de falar sobre meu projeto.";
    return Response.json({
      text: fallbackText,
      whatsappMessage: fallbackWhatsapp,
      buttons: ["whatsappButton"],
    });
  }
}
