async function sendCost() {
  const cost = document.getElementById('costInput').value;
  const resultEl = document.getElementById('result');

  resultEl.textContent = 'Loading...';

  try {
    const res = await fetch('/api/zapier', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ totalCost: cost }),
    });

    const data = await res.json();

    if (res.ok) {
      resultEl.textContent = data.prompt;
    } else {
      resultEl.textContent = data.error || 'Unknown error';
    }
  } catch (err) {
    resultEl.textContent = 'Request failed: ' + err.message;
  }
}