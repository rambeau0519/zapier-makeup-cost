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
    const zapierWebhookUrl = 'https://hooks.zapier.com/hooks/catch/23888128/uu24j65/';

    console.log('Calling Zapier webhook:', zapierWebhookUrl);
    console.log('Sending totalCost:', totalCost);

    const response = await fetch(zapierWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ totalCost }),
    });

    console.log('Zapier response status:', response.status);

    const data = await response.json();

    console.log('Zapier response data:', data);

    if (!data.prompt) {
      res.status(500).json({ error: 'No prompt returned from Zapier' });
      return;
    }

    res.status(200).json({ prompt: data.prompt });
  } catch (error) {
    console.error('Error calling Zapier:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
