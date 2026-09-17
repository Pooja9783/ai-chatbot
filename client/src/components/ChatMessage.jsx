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
        <div className="my-5 overflow-hidden rounded-lg border border-[#2A2A2D]">

            {/* Code header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#19191B] border-b border-[#2A2A2D]">
                <span className="text-[11px] font-medium text-[#77777C] uppercase tracking-wide">
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

            <SyntaxHighlighter
                style={oneDark}
                language={language}
                PreTag="div"
                customStyle={{
                    margin: 0,
                    padding: "18px",
                    background: "#151516",
                    fontSize: "13px",
                    lineHeight: "1.65",
                    overflowX: "auto",
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

            {isUser ? (
                <div className="max-w-[75%]">
                    <div className="flex justify-end mb-2">
                        <span className="text-[11px] text-[#5F5F64]">
                            You
                        </span>
                    </div>

                    <div className="bg-[#F97360] text-[#171717] px-4 py-3 rounded-2xl rounded-br-md">
                        <p className="text-sm leading-6">
                            {message.content}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-[90%]">

                    {/* Assistant identity */}
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-md bg-[#F97360] flex items-center justify-center">
                            <span className="text-[9px] font-bold text-[#171717]">
                                AI
                            </span>
                        </div>

                        <span className="text-xs font-medium text-[#A1A1A6]">
                            AI Assistant
                        </span>
                    </div>

                    {/* Response */}
                    <div className="text-[15px] text-[#D4D4D8] leading-7">
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
                                            className="bg-[#202023] text-[#F97360] px-1.5 py-0.5 rounded text-[13px]"
                                            {...props}
                                        >
                                            {children}
                                        </code>
                                    );
                                },

                                p({ children }) {
                                    return (
                                        <p className="mb-5 last:mb-0">
                                            {children}
                                        </p>
                                    );
                                },

                                ul({ children }) {
                                    return (
                                        <ul className="list-disc pl-6 mb-5 space-y-1.5">
                                            {children}
                                        </ul>
                                    );
                                },

                                ol({ children }) {
                                    return (
                                        <ol className="list-decimal pl-6 mb-5 space-y-1.5">
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

                                blockquote({ children }) {
                                    return (
                                        <blockquote className="border-l-2 border-[#F97360] pl-4 my-4 text-[#96969C]">
                                            {children}
                                        </blockquote>
                                    );
                                },
                            }}
                        >
                            {message.content}
                        </ReactMarkdown>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatMessage;