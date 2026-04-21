import { NextRequest, NextResponse } from 'next/server';
import { mensajeWhatsAppChatDesdeContexto, whatsappHref } from '@/lib/store-data';

type IncomingMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing OPENAI_API_KEY in environment.' }, { status: 500 });
    }

    const model = process.env.OPENAI_CHAT_MODEL || process.env.OPENAI_MODEL || 'gpt-4.1-mini';
    const body = await req.json().catch(() => ({}));
    const incomingMessages: IncomingMessage[] = Array.isArray(body?.messages) ? body.messages : [];
    const pageContext = typeof body?.pageContext === 'string' ? body.pageContext : '';

    const cleanMessages = incomingMessages
      .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .slice(-10);

    const systemPrompt = [
      'Sos un asesor comercial de una tienda importadora Apple en Argentina.',
      'Respondé SOLO con información que esté en el CONTEXTO DE PAGINA provisto.',
      'Si algo no está en el contexto, decilo claramente y ofrecé seguir por WhatsApp.',
      'No inventes precios, stock, colores ni disponibilidad.',
      'Sé útil, breve y accionable para clientes finales.',
      '',
      'WHATSAPP (muy importante):',
      '- NUNCA uses placeholders como [WhatsApp ventas], ni pegues la URL de wa.me en texto plano.',
      '- Si el cliente debe seguir por WhatsApp, explicá en una frase y el servidor agregará un enlace clicable "Consultar por WhatsApp" con mensaje prellenado; no intentes armar la URL vos.',
      `Fecha actual de consulta: ${new Date().toISOString()}`,
      'CONTEXTO DE PAGINA:',
      pageContext || 'Sin contexto.'
    ].join('\n\n');

    const messages = [
      { role: 'system', content: systemPrompt },
      ...cleanMessages.map((m) => ({ role: m.role, content: m.content }))
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.2,
        max_tokens: 450
      })
    });

    if (!response.ok) {
      const detail = await response.text();
      return NextResponse.json({ error: 'OpenAI request failed', detail }, { status: 500 });
    }

    const data = await response.json();
    let text = (data?.choices?.[0]?.message?.content || '').trim();

    const lastUser =
      [...cleanMessages].reverse().find((m) => m.role === 'user')?.content?.trim() ?? '';
    const waUrl = whatsappHref(mensajeWhatsAppChatDesdeContexto(lastUser, pageContext));

    text = text
      .replace(/\[(WhatsApp ventas|WhatsApp)\]/gi, '')
      .replace(/Te paso el contacto de WhatsApp ventas para que consultes todo lo que necesites:\s*/gi, '')
      .replace(/\s{2,}/g, ' ')
      .trim();

    const tieneLinkCorrecto = /\[Consultar por WhatsApp\]\(https:\/\/wa\.me\//i.test(text);
    if (!tieneLinkCorrecto) {
      text = `${text}\n\n[Consultar por WhatsApp](${waUrl})`;
    }

    return NextResponse.json({ answer: text || 'No pude generar respuesta en este momento.' });
  } catch (error) {
    return NextResponse.json({ error: 'Unexpected error', detail: String(error) }, { status: 500 });
  }
}
