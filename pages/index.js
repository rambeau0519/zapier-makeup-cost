import { useState } from 'react';

export default function Home() {
  const [totalCost, setTotalCost] = useState('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const sendToZapier = async () => {
    setLoading(true);
    setPrompt('');
    try {
      const res = await fetch('/api/zapier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ totalCost }),
      });
      const data = await res.json();
      if (data.prompt) {
        setPrompt(data.prompt);
      } else {
        setPrompt(data.error || 'No prompt returned');
      }
    } catch (err) {
      setPrompt('Error calling backend');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Makeup Brush Prompt Generator</h1>
      <input
        type="number"
        placeholder="Enter total cost"
        value={totalCost}
        onChange={(e) => setTotalCost(e.target.value)}
      />
      <button onClick={sendToZapier} disabled={loading}>
        {loading ? 'Sending...' : 'Generate Prompt'}
      </button>
      <pre>{prompt}</pre>
    </div>
  );
}