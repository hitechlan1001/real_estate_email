import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateEmail(
  agentName: string,
  address: string,
  offer: string
) {
  const baseTemplate = `Write a short and clear email to ${agentName} about a cash offer for the property at ${address}. 

Use a natural, confident tone — like a real estate investor who speaks directly. Avoid overly formal or robotic language. Keep it friendly and straightforward, like you'd actually say it in person. Mention that we’re fast and easy to work with, and open to creative deal types. 

Put the offer terms in bullet points at the bottom.

Terms:
- All cash (3-week closing or a date that works for you)
- $${offer}
- 14-day due diligence
- Buyer pays title and closing costs
- No buyer’s agent commission
- $500 earnest money
- Buyer pays survey (if needed)

Close the email by thanking the agent and saying we’re looking forward to hearing back. Sign as “Aaron”.`;

  const instructions = [
    "Rewrite in a friendlier tone",
    "Write at an 8th grade level",
    "Simplify this email",
    "Vary the wording of the email",
    "Rewrite the email",
    "Try again",
  ];

  const variations = await Promise.all(
    instructions.map((instruction) =>
      openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are a friendly real estate investor writing natural, confident, and easy-to-read emails to listing agents. Keep it brief and human.",
          },
          {
            role: "user",
            content: `${baseTemplate}\n\nInstruction: ${instruction}`,
          },
        ],
      })
    )
  );

  return variations.map((v) => v.choices[0].message.content);
}
