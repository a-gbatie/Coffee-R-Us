import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
      <h2>Coffee R Us Assistant</h2>
      <p>Have a question about coffee? Ask our assistant!</p>

      {/* Display customer and AI messages */}
      <div className="chat-messages" aria-live="polite">
        {messages.map((chatMessage, index) => (
          <div key={index} className={`chat-message ${chatMessage.role}`}>
            <strong>
              {chatMessage.role === "user" ? "You:" : "Assistant:"}
            </strong>

            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {chatMessage.content}
            </ReactMarkdown>
          </div>
        ))}
      </div>

      {loading && <p>Assistant is thinking...</p>}
      {error && <p role="alert">{error}</p>}

      {/* Send a question to Ollama */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="Ask about our coffee..."
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