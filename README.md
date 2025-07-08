# 🤖 AI Tic-Tac-Toe - Unbeatable Challenge

A beautiful, modern Tic-Tac-Toe game featuring an unbeatable AI opponent with stunning dark mode UI and smooth animations.

## ✨ Features

### 🎮 Game Features
- **Unbeatable AI**: Uses Minimax algorithm with Alpha-Beta pruning
- **Multiple Difficulty Levels**: Easy, Medium, and Hard (Unbeatable)
- **Score Tracking**: Keep track of wins, losses, and draws
- **Game Statistics**: Monitor moves and games played
- **Keyboard Support**: Use number keys 1-9 to make moves

### 🎨 Visual Features
- **Dark Mode Design**: Beautiful gradient backgrounds with animated effects
- **Smooth Animations**: Particle effects, cell pop animations, and hover effects
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Glassmorphism effects with backdrop blur
- **Interactive Elements**: Hover effects and visual feedback

### 🔊 Audio Features
- **Sound Effects**: Different sounds for moves, wins, losses, and draws
- **Web Audio API**: Synthesized sounds for immersive experience

### 🎯 AI Algorithm
- **Minimax Algorithm**: Perfect decision-making for optimal moves
- **Alpha-Beta Pruning**: Optimized search for faster performance
- **Three Difficulty Levels**:
  - **Easy**: Random moves
  - **Medium**: 70% optimal moves, 30% random
  - **Hard**: Always optimal moves (unbeatable)

## 🚀 How to Play

1. **Open the Game**: Simply open `index.html` in your web browser
2. **Choose Difficulty**: Select from Easy, Medium, or Hard
3. **Make Your Move**: Click on any empty cell or use number keys 1-9
4. **Watch AI Respond**: The AI will make its move after a short delay
5. **Track Progress**: Monitor your score and game statistics

## 🎮 Controls

### Mouse Controls
- **Click**: Make a move on any empty cell
- **New Game**: Click "New Game" button
- **Reset Scores**: Click "Reset Scores" button

### Keyboard Controls
- **1-9**: Make moves on corresponding board positions
- **Spacebar**: Start a new game
- **R**: Reset all scores

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic structure
- **CSS3**: Modern styling with animations and gradients
- **JavaScript (ES6+)**: Game logic and AI implementation
- **Web Audio API**: Sound effects
- **Font Awesome**: Icons
- **Google Fonts**: Typography

### AI Implementation
The AI uses the Minimax algorithm with Alpha-Beta pruning:

```javascript
minimax(board, depth, isMaximizing, alpha, beta) {
    // Terminal conditions
    if (checkWinnerForAI(board, aiPlayer)) return 10 - depth;
    if (checkWinnerForAI(board, 'X')) return depth - 10;
    if (isBoardFullForAI(board)) return 0;
    
    // Recursive minimax with alpha-beta pruning
    // ... implementation details
}
```

### Key Features
- **Game State Management**: Complete game state tracking
- **Event Handling**: Comprehensive event listeners
- **Animation System**: Smooth CSS and JavaScript animations
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Keyboard navigation support

## 📁 Project Structure

```
AI-tictactoe/
├── index.html          # Main HTML file
├── style.css           # CSS styles and animations
├── script.js           # Game logic and AI implementation
└── README.md           # Project documentation
```

## 🎯 Game Theory Concepts

This project demonstrates several important concepts:

1. **Minimax Algorithm**: A recursive algorithm for finding optimal moves
2. **Alpha-Beta Pruning**: Optimization technique to reduce search space
3. **Game Tree Search**: Exploring possible game states
4. **Heuristic Evaluation**: Scoring game positions
5. **Decision Making**: AI choosing the best move

## 🚀 Getting Started

1. **Clone or Download**: Get the project files
2. **Open in Browser**: Double-click `index.html` or open in your preferred browser
3. **Start Playing**: Choose difficulty and begin your game!

No installation or dependencies required - it's a pure HTML/CSS/JavaScript application.

## 🎨 Customization

You can easily customize the game by modifying:

- **Colors**: Update CSS variables in `style.css`
- **Animations**: Modify animation durations and effects
- **AI Difficulty**: Adjust the difficulty logic in `script.js`
- **Sound Effects**: Change frequencies and durations in the audio functions

## 🤝 Contributing

Feel free to contribute to this project by:
- Adding new features
- Improving the AI algorithm
- Enhancing the UI/UX
- Adding new difficulty levels
- Optimizing performance

## 📝 License

This project is open source and available under the MIT License.

## 🎉 Enjoy Playing!

Challenge yourself against the unbeatable AI and see how long you can hold your own! The AI will always make the optimal move, making it impossible to win - but you can try to force a draw! 🎮✨

---

**Made with ❤️ and lots of JavaScript magic!** 