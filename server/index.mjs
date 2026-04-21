import fs from 'fs';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

// Load env files explicitly from project root so it works regardless of cwd.
const envLocalPath = path.join(rootDir, '.env.local');
const envPath = path.join(rootDir, '.env');
if (fs.existsSync(envLocalPath)) dotenv.config({ path: envLocalPath });
if (fs.existsSync(envPath)) dotenv.config({ path: envPath });

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    now: new Date().toISOString(),
    hasOpenAIKey: Boolean(process.env.OPENAI_API_KEY),
    model: process.env.OPENAI_CHAT_MODEL || process.env.OPENAI_MODEL || 'gpt-4.1-mini'
  });
});

app.post('/api/chat', async (req, res) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Missing OPENAI_API_KEY in environment.' });
    }

    const model =
      process.env.OPENAI_CHAT_MODEL ||
      process.env.OPENAI_MODEL ||
      'gpt-4.1-mini';
    const { messages: incomingMessages = [], pageContext = '' } = req.body || {};

    const cleanMessages = Array.isArray(incomingMessages)
      ? incomingMessages
          .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
          .slice(-10)
      : [];

    const systemPrompt = [
      'Sos un asesor comercial de una tienda importadora Apple en Argentina.',
      'Respondé SOLO con información que esté en el CONTEXTO DE PAGINA provisto.',
      'Si algo no está en el contexto, decilo claramente y sugerí contactar por WhatsApp.',
      'No inventes precios, stock, colores ni disponibilidad.',
      'Sé útil, breve y accionable para clientes finales.',
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
      return res.status(500).json({ error: 'OpenAI request failed', detail });
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content || '';

    return res.json({ answer: text.trim() || 'No pude generar respuesta en este momento.' });
  } catch (error) {
    return res.status(500).json({ error: 'Unexpected error', detail: String(error) });
  }
});

app.use(express.static(distDir));
app.get('*', (_req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

const port = Number(process.env.PORT || 8787);
app.listen(port, () => {
  console.log(`API+static server running on http://localhost:${port}`);
});
