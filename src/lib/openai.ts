import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateEmail(
  agentName: string,
  address: string,
  offer: string
) {
  const basePrompt = `Send ${agentName} kindly written email about the offer at ${address} with these terms:
- All cash (3 week closing)
- $${offer}
- 14 Day due diligence
- Buyer pays all closing costs
- No agent commission
- $500 earnest money
- Buyer pays survey

My client is an experienced investor who buys fast and easy. We also buy sub-to and seller-financed homes. Thanks, Aaron.`;

  const variations = await Promise.all(
    [
      "Rewrite in a friendlier tone",
      "Write at an 8th grade level",
      "Simplify this email",
      "vary the wording the email",
      "Rewrite the email",
      "Try again",
    ].map((cmd) =>
      openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a real estate investor writing to an agent.",
          },
          { role: "user", content: `${basePrompt}\n\n${cmd}` },
        ],
        model: "gpt-4",
      })
    )
  );

  return variations.map((v) => v.choices[0].message.content);
}
