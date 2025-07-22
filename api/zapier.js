import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Only POST allowed' });
    return;
  }

  const { totalCost } = req.body;

  if (!totalCost) {
    res.status(400).json({ error: 'Missing totalCost' });
    return;
  }

  try {
    const zapierWebhookUrl = 'https://hooks.zapier.com/hooks/catch/your_zap_id/your_hook_id/';

    const response = await fetch(zapierWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ totalCost }),
    });

    const data = await response.json();

    if (!data.prompt) {
      res.status(500).json({ error: 'No prompt returned from Zapier' });
      return;
    }

    res.status(200).json({ prompt: data.prompt });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}