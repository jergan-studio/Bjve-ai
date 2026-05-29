const API_KEY = "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";

async function ask() {
  const input = document.getElementById("input").value;
  const output = document.getElementById("output");

  output.textContent = "Thinking...";

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama3-70b-8192",
      messages: [
        {
          role: "system",
          content: "You are BJVE AI. Use BJVE Studio (HTML/CSS), Fire (Luau), UEVTCL (OpenDraw)."
        },
        {
          role: "user",
          content: input
        }
      ]
    })
  });

  const data = await res.json();

  output.textContent =
    data.choices?.[0]?.message?.content ||
    JSON.stringify(data, null, 2);
}
