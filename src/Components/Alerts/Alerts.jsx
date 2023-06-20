function ErrorAlert({ messages }) {
  if (messages.length) {
    return (
      <div className="bg-red-500 text-white p-4">
        {messages.map((elem, index) => (
          <p key={index}>{elem}</p>
        ))}
      </div>
    );
  }
  return null;
}

export default ErrorAlert;
