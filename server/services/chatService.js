const restrictionPrompt = require("../utils/systemPrompt");

const getResponsefromAI = async (messages) => {
    try {
        const openRouterResponse = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.OPEN_ROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "openrouter/free",
                    messages: [
                        {
                            role: "system",
                            content: restrictionPrompt
                        },
                        ...messages,
                    ],
                }),
            }
        );

        if (!openRouterResponse.ok) {
            throw new Error(`OpenRouter error: ${openRouterResponse.status}`);
        }

        const data = await openRouterResponse.json();

        const answer = data.choices?.[0]?.message?.content;

        return answer

    } catch (error) {
        console.error(error);
        throw Error(error)
    }
}

module.exports = {
    getResponsefromAI
}