/* ====================================================
   LiveLab 10 – GlowGuide Demo Script
   Focus: Advanced APIs + Error Handling
   Instructor is not coding but is primarily
    explaining the code structure and best practices.
======================================================== */

// STEP 1: Select DOM Elements
const button = document.getElementById("askBtn");
const input = document.getElementById("userInput");
const responseDiv = document.getElementById("response");

// STEP 2: Add Event Listener
button.addEventListener("click", async () => {
  const userQuestion = input.value.trim();

  if (!userQuestion) {
    responseDiv.textContent = "Please enter a question first.";
    return;
  }

  responseDiv.textContent = "Thinking...";

  // STEP 3: API Call with async/await + try/catch
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${api_key}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userQuestion }],
      }),
    });

    // STEP 4: Handle non-200 responses
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    // Extract the AI's response from OpenAI's format
    responseDiv.textContent =
      data.choices?.[0]?.message?.content || "No response received.";
     // let content = "No response received.";
     // if (data.choices && data.choices[0] && data.choices[0].message) {
  content = data.choices[0].message.content;
}

if (data.choices && data.choices[0] && data.choices[0].message) {
  content = data.choices[0].message.content;
}
  } catch (error) {
    console.error("Error:", error);
    responseDiv.textContent = "Oops! Something went wrong. Please try again.";
  }
});

/* =====================================
   INSTRUCTOR TALKING POINTS:
   - Why async/await improves readability
   - Why try/catch is critical for AI apps
   - Why we NEVER expose API keys in frontend
   - How this directly supports the L'Oréal project
===================================== */
