import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "../styles/CoffeeAssistant.css";

function CoffeeAssistant() {
  // Store the customer's current input
  const [message, setMessage] = useState("");

  // Store the conversation history
  const [messages, setMessages] = useState([]);

  // Track AI response loading and errors
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setMessage(e.target.value);
  }

  // Send the conversation to Ollama
  async function handleSubmit(e) {
    e.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || loading) {
      return;
    }

    const userMessage = {
      role: "user",
      content: trimmedMessage,
    };

    // Include the new question in the conversation
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/ollama/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3.2:3b",
          stream: false,
          messages: [
            {
              role: "system",
              content:
                "You are a friendly coffee assistant for Coffee R Us. Help customers with coffee flavors, roasts, and brewing. Keep responses clear and helpful. Do not invent product prices or availability.",
            },
            ...updatedMessages,
          ],
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to get AI response");
      }

      const data = await res.json();

      const assistantMessage = {
        role: "assistant",
        content: data.message.content,
      };

      // Add Ollama's response to the conversation
      setMessages((previousMessages) => [
        ...previousMessages,
        assistantMessage,
      ]);
    } catch {
      setError("Unable to reach Ollama. Check that it is running.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="coffee-assistant">
      <div className="chat-header">
        <h2>Coffee R Us Assistant</h2>
        <p>Need a recommendation? Ask away!</p>
      </div>

      {/* Display the conversation */}
      <div className="chat-messages" aria-live="polite">
        {messages.length === 0 && (
          <p className="chat-welcome">
            Welcome! Ask me about coffee flavors, roasts, or about other drinks.
          </p>
        )}

        {messages.map((chatMessage, index) => (
          <div key={index} className={`chat-message ${chatMessage.role}`}>
            <span className="chat-sender">
              {chatMessage.role === "user" ? "You" : "Coffee Assistant"}
            </span>

            {/* Format Ollama responses using Markdown */}
            <div className="chat-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {chatMessage.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}

        {loading && (
          <p className="chat-loading">Coffee Assistant is thinking...</p>
        )}
      </div>

      {error && (
        <p className="chat-error" role="alert">
          {error}
        </p>
      )}

      {/* Customer message input */}
      <form className="chat-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="Ask me anything about coffee..."
          aria-label="Message"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Thinking..." : "Send"}
        </button>
      </form>
    </section>
  );
}

export default CoffeeAssistant;
