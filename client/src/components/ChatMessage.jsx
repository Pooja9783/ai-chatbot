import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

function CodeBlock({ language, code }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error("Failed to copy code:", error);
        }
    };

    return (
        <div className="my-4 overflow-hidden rounded-xl border border-[#29292B]">

            {/* Code header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#1B1B1D] border-b border-[#29292B]">
                <span className="text-xs text-[#77777C]">
                    {language}
                </span>

                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs text-[#77777C] hover:text-white transition"
                    aria-label="Copy code"
                >
                    {copied ? (
                        <>
                            <Check size={14} />
                            Copied
                        </>
                    ) : (
                        <>
                            <Copy size={14} />
                            Copy
                        </>
                    )}
                </button>
            </div>

            {/* Code */}
            <SyntaxHighlighter
                style={oneDark}
                language={language}
                PreTag="div"
                customStyle={{
                    margin: 0,
                    padding: "16px",
                    background: "#151516",
                    fontSize: "13px",
                    lineHeight: "1.6",
                }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
}

function ChatMessage({ message }) {
    const isUser = message.role === "user";

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>

            <div
                className={
                    isUser
                        ? "max-w-[80%] bg-[#F97360] text-[#171717] px-4 py-3 rounded-2xl rounded-br-md"
                        : "max-w-[85%] text-[#D4D4D8] leading-7"
                }
            >
                {isUser ? (
                    <p className="text-sm">
                        {message.content}
                    </p>
                ) : (
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            code({
                                inline,
                                className,
                                children,
                                ...props
                            }) {
                                const match =
                                    /language-(\w+)/.exec(
                                        className || ""
                                    );

                                const code = String(children).replace(
                                    /\n$/,
                                    ""
                                );

                                if (!inline && match) {
                                    return (
                                        <CodeBlock
                                            language={match[1]}
                                            code={code}
                                        />
                                    );
                                }

                                return (
                                    <code
                                        className="bg-[#202023] text-[#F97360] px-1.5 py-0.5 rounded text-sm"
                                        {...props}
                                    >
                                        {children}
                                    </code>
                                );
                            },

                            p({ children }) {
                                return (
                                    <p className="mb-4 last:mb-0">
                                        {children}
                                    </p>
                                );
                            },

                            ul({ children }) {
                                return (
                                    <ul className="list-disc pl-6 mb-4 space-y-1">
                                        {children}
                                    </ul>
                                );
                            },

                            ol({ children }) {
                                return (
                                    <ol className="list-decimal pl-6 mb-4 space-y-1">
                                        {children}
                                    </ol>
                                );
                            },

                            h1({ children }) {
                                return (
                                    <h1 className="text-2xl font-semibold text-white mb-4">
                                        {children}
                                    </h1>
                                );
                            },

                            h2({ children }) {
                                return (
                                    <h2 className="text-xl font-semibold text-white mb-3">
                                        {children}
                                    </h2>
                                );
                            },

                            h3({ children }) {
                                return (
                                    <h3 className="text-lg font-semibold text-white mb-2">
                                        {children}
                                    </h3>
                                );
                            },
                        }}
                    >
                        {message.content}
                    </ReactMarkdown>
                )}
            </div>
        </div>
    );
}

export default ChatMessage;