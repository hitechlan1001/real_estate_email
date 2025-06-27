import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateEmail(
  agentName: string,
  address: string,
  offer: string
) {
  const baseTemplate = `Send ${agentName} kindly written email about the offer at ${address} with the following summary of terms:

My client is a very experienced investor in the area and is interested in buying the property you have listed. We can close quickly and we don’t play games. Please get back to us at your earliest convenience. If you have any other properties you’re looking to get a cash offer on, please let us know. We also have experience buying houses sub-to, owner finance, etc., if you believe the property may be better suited for a creative offer.

We appreciate your consideration and look forward to working with you!

Please include the terms summarized before the closing of the email:
- All cash (3 week closing or at a date of your choosing)
- $${offer}
- 14 Day due diligence period
- Buyer pays title and closing costs
- No buyers agent commission
- 500 dollars earnest money
- Buyer pays survey (if needed)

Thanks,  
Aaron`;

  const instructions = [
    "Rewrite in a friendlier tone",
    "Simplify this email",
    "Vary the wording the email",
    "Rewrite the email",
    "Try again",
    "Write at an 8th grade level",
  ];

  const variations = await Promise.all(
    instructions.map((instruction) =>
      openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are a friendly real estate investor writing natural-sounding, casual emails to agents. Keep it professional but easy to read, with a tone that’s confident, clear, and human.",
          },
          {
            role: "user",
            content: `${baseTemplate}\n\n${instruction}`,
          },
        ],
      })
    )
  );

  return variations.map((v) => v.choices[0].message.content);
}
