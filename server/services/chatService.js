const restrictionPrompt = require("../utils/systemPrompt");
const { sleep, isRetryableStatus } = require('../utils/helper')

const getResponsefromAI = async (messages, onChunk) => {

    const MAX_RETRIES = 3

    const recentMessages = messages.slice(-20)

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        const controller = new AbortController();

        const timeout = setTimeout(() => {
            controller.abort()
        }, 10000)

        try {
            const openRouterResponse = await fetch(
                "https://openrouter.ai/api/v1/chat/completions",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${process.env.OPEN_ROUTER_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                    signal: controller.signal,
                    body: JSON.stringify({
                        model: "openrouter/free",
                        max_tokens: 1000,
                        stream: true,
                        messages: [
                            {
                                role: "system",
                                content: restrictionPrompt
                            },
                            ...recentMessages,
                        ],
                    }),
                }
            );

            clearTimeout(timeout);

            if (!openRouterResponse.ok) {
                const error = new Error(`OpenRouter error: ${openRouterResponse.status}`);

                error.status = openRouterResponse.status;

                throw error;
            }

            const reader = openRouterResponse.body.getReader();
            const decoder = new TextDecoder();

            let fullAnswer = "";
            let buffer = "";

            while (true) {
                const { done, value } = await reader.read();

                if (done) break;

                const chunk = decoder.decode(value, { stream: true });

                buffer += chunk;

                const lines = buffer.split("\n");

                buffer = lines.pop();

                for (const line of lines) {
                    if (!line.startsWith("data:")) continue;

                    const data = line.slice(5).trim();

                    if (data === "[DONE]") continue;

                    const parsed = JSON.parse(data);

                    const content = parsed.choices?.[0]?.delta?.content;

                    if (!content) continue;

                    fullAnswer += content;

                    onChunk(content);
                }
            }

            return fullAnswer;

        } catch (error) {
            clearTimeout(timeout);

            if (attempt === MAX_RETRIES) {
                throw Error(error)
            }

            const retryable = error.name === 'AbortError' || isRetryableStatus(error.status)

            if (!retryable) throw error

            const delay = 500 * Math.pow(2, attempt);

            console.log(`AI request failed. Retrying in ${delay}ms...`);

            await sleep(delay);

        }
    }
}

module.exports = {
    getResponsefromAI
}