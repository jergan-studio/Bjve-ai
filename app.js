const API_KEY = "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";

async function ask() {
  const input = document.getElementById("input").value;
  const output = document.getElementById("output");

  if (!input) {
    output.textContent = "Type something first.";
    return;
  }

  output.textContent = "Thinking...";

  try {
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
            content: `
You are BJVE AI.

BJVE SYSTEM:
- Studio = HTML + CSS
- Fire = Luau logic
- UEVTCL = OpenDraw engine

Answer clearly and simply.
`
          },
          {
            role: "user",
            content: input
          }
        ]
      })
    });

    const data = await res.json();

    if (!res.ok) {
      output.textContent =
        "ERROR " + res.status + "\n\n" +
        JSON.stringify(data, null, 2);
      return;
    }

    output.textContent =
      data.choices?.[0]?.message?.content ||
      "No response";
  } catch (err) {
    output.textContent = "NETWORK ERROR:\n" + err.message;
  }
}
