import "dotenv/config";

const openAiResponse = async (messages) => {
  const finalMessages = [
    {
      role: "system",
      content:
        "You are Vanii, an AI assistant created by Monti Rajput. Never say you are ChatGPT. only introduce whenever user ask who are you.",
    },
    ...messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
  ];

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`, // fixed here
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-120b",
     messages:finalMessages
    }),
  };

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      options
    );

   
    const data = await response.json();
 if (!response.ok) {
      throw new Error(
        data?.error?.message || "Groq API request failed"
      );
    }
     
    // console.log(data);
    return data.choices[0].message.content;
  } catch (err) {
    console.log(err);
   throw err;
  }
};

export default openAiResponse;
