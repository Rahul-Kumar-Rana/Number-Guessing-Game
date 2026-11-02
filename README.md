🎮 Number Guessing Game In Bubble Form..

A fun and interactive Number Guessing Game built using Java, HTML, CSS, and JavaScript.

The computer generates a secret number between 1 and 100. Players have to find the correct number by selecting one of the 10 bubbles displayed on the screen.

The Java backend checks each guess and provides hints to help the player find the correct number.

✨ Features
Random secret number generation (1–100).
10 unique number bubbles in every game.
Java backend integration using HTTP Server.
Instant feedback for wrong guesses.
Greater and Smaller number hints.
Animated arrows for directional hints.
Winning animation with emoji effects.
Reset Game option to start a new game.
Clean and interactive user interface.
🛠️ Technologies Used

Frontend:

HTML5
CSS3
JavaScript

Backend:

Java
Java HTTP Server
HTTP API
📁 Project Structure
text
Number-Guessing-Game/
│
├── UserGuessServer.java
│
├── index.html
├── style.css
├── script.js
│
└── README.md

🚀 How to Run the Project
1. Clone the Repository
bash
git clone YOUR_REPOSITORY_URL

2. Start the Java Backend

Open the terminal in your project folder and compile the Java file:

bash
javac UserGuessServer.java


Run the backend server:

bash
java UserGuessServer


The Java backend will start on:

text
http://localhost:8081

3. Run the Frontend

Open index.html in your web browser.

You can also use the Live Server extension in Visual Studio Code.

4. Start Playing!
Click any bubble to guess the secret number.
If your guess is wrong, the game will show a Greater or Smaller hint.
Find the correct number to win the game.
Click the Reset Game button to play again.
🔗 Backend API Endpoints
Method	Endpoint	Description
GET	/game1/guess?num=NUMBER	Checks the selected number
GET	/game1/restart	Generates a new secret number
🎯 Game Objective

The main objective is to find the computer-generated secret number by selecting the correct bubble.

Use the hints carefully and find the correct number!

👨‍💻 Author

Developed as a Number Guessing Game project using Java and Web Technologies.

Thank you for checking out the Bubble Guessing Game! ❤️