const restrictionPrompt = require("../utils/systemPrompt");
const { sleep, isRetryableStatus } = require('../utils/helper')

const getResponsefromAI = async (messages) => {

    const MAX_RETRIES = 3

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
                            ...messages,
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

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            let fullAnswer = "";

            while (true) {
                const { done, value } = await reader.read();

                if (done) break;

                const chunk = decoder.decode(value, { stream: true });

                // We'll parse the SSE data here
                console.log(chunk);
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