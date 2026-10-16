import { useState } from "react";

function CoffeeAssistant() {
  // Store the message currently being typed
  const [message, setMessage] = useState("");

  // Store the conversation history
  const [messages, setMessages] = useState([]);

  // Update the input as the user types
  function handleChange(e) {
    setMessage(e.target.value);
  }

  // Add the customer's message to the conversation
  function handleSubmit(e) {
    e.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    const newMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedMessage,
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      newMessage,
    ]);

    // Clear the input after submitting
    setMessage("");
  }

  return (
    <section className="coffee-assistant">
      <h2>Coffee R Us Assistant</h2>
      <p>Have a question about coffee? Ask our assistant!</p>

      {/* Display the conversation */}
      <div className="chat-messages" aria-live="polite">
        {messages.map((chatMessage) => (
          <p key={chatMessage.id}>
            <strong>
              {chatMessage.role === "user" ? "You" : "Assistant"}:
            </strong>{" "}
            {chatMessage.content}
          </p>
        ))}
      </div>

      {/* Allow customers to submit a question */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="Ask about our coffee..."
          aria-label="Message"
        />

        <button type="submit">Send</button>
      </form>
    </section>
  );
}

export default CoffeeAssistant;