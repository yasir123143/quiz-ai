export default async function handler(req, res) {
  const response = await fetch("https://api.fireworks.ai/inference/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.FIREWORKS_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "accounts/fireworks/models/llama-v3p1-8b-instruct",
      messages: [
        { role: "system", content: "You are a quiz generator. Always reply with valid JSON only." },
        { role: "user", content: `Make one multiple-choice question with exactly 4 options. Reply only with JSON like:
{
  "q": "Question text",
  "options": ["A","B","C","D"],
  "answer": 1,
  "img": "images/my-image.png"
}
If no image is available, omit the img field.` }
      ],
      max_tokens: 200
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}
