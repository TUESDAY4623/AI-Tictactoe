// Game State
class TicTacToeGame {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X'; // Human player
        this.aiPlayer = 'O';
        this.gameActive = true;
        this.scores = { player: 0, ai: 0 };
        this.moveCount = 0;
        this.gamesPlayed = 0;
        this.difficulty = 'hard';
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        
        this.initializeGame();
    }

    initializeGame() {
        this.setupEventListeners();
        this.updateDisplay();
        this.addSoundEffects();
    }

    setupEventListeners() {
        // Board cells
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.makeMove(index);
            });
        });

        // Buttons
        document.getElementById('new-game-btn').addEventListener('click', () => {
            this.newGame();
        });

        document.getElementById('reset-scores-btn').addEventListener('click', () => {
            this.resetScores();
        });

        document.getElementById('play-again-btn').addEventListener('click', () => {
            this.closeModal();
            this.newGame();
        });

        // Difficulty selector
        document.getElementById('difficulty').addEventListener('change', (e) => {
            this.difficulty = e.target.value;
            this.updateStatus();
        });

        // Modal close on outside click
        document.getElementById('victory-modal').addEventListener('click', (e) => {
            if (e.target.id === 'victory-modal') {
                this.closeModal();
            }
        });
    }

    makeMove(index) {
        if (!this.gameActive || this.board[index] !== '') return;

        // Human move
        this.board[index] = this.currentPlayer;
        this.moveCount++;
        this.updateCell(index, this.currentPlayer);
        this.playSound('move');

        if (this.checkWinner()) {
            this.handleGameEnd('player');
            return;
        }

        if (this.isBoardFull()) {
            this.handleGameEnd('draw');
            return;
        }

        // Switch to AI turn
        this.currentPlayer = this.aiPlayer;
        this.updateStatus();
        
        // Add delay for better UX
        setTimeout(() => {
            this.makeAIMove();
        }, 500);
    }

    makeAIMove() {
        if (!this.gameActive) return;

        let aiMove;
        
        switch (this.difficulty) {
            case 'easy':
                aiMove = this.getRandomMove();
                break;
            case 'medium':
                aiMove = Math.random() < 0.7 ? this.getBestMove() : this.getRandomMove();
                break;
            case 'hard':
            default:
                aiMove = this.getBestMove();
                break;
        }

        if (aiMove !== -1) {
            this.board[aiMove] = this.aiPlayer;
            this.moveCount++;
            this.updateCell(aiMove, this.aiPlayer);
            this.playSound('move');

            if (this.checkWinner()) {
                this.handleGameEnd('ai');
                return;
            }

            if (this.isBoardFull()) {
                this.handleGameEnd('draw');
                return;
            }

            // Switch back to human turn
            this.currentPlayer = 'X';
            this.updateStatus();
        }
    }

    getBestMove() {
        let bestScore = -Infinity;
        let bestMove = -1;
        const availableMoves = this.getAvailableMoves();

        for (let move of availableMoves) {
            this.board[move] = this.aiPlayer;
            const score = this.minimax(this.board, 0, false, -Infinity, Infinity);
            this.board[move] = '';

            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }

        return bestMove;
    }

    minimax(board, depth, isMaximizing, alpha, beta) {
        // Terminal conditions
        if (this.checkWinnerForAI(board, this.aiPlayer)) {
            return 10 - depth;
        }
        if (this.checkWinnerForAI(board, 'X')) {
            return depth - 10;
        }
        if (this.isBoardFullForAI(board)) {
            return 0;
        }

        const availableMoves = this.getAvailableMovesForAI(board);

        if (isMaximizing) {
            let maxScore = -Infinity;
            for (let move of availableMoves) {
                board[move] = this.aiPlayer;
                const score = this.minimax(board, depth + 1, false, alpha, beta);
                board[move] = '';
                maxScore = Math.max(maxScore, score);
                alpha = Math.max(alpha, score);
                if (beta <= alpha) break; // Alpha-Beta pruning
            }
            return maxScore;
        } else {
            let minScore = Infinity;
            for (let move of availableMoves) {
                board[move] = 'X';
                const score = this.minimax(board, depth + 1, true, alpha, beta);
                board[move] = '';
                minScore = Math.min(minScore, score);
                beta = Math.min(beta, score);
                if (beta <= alpha) break; // Alpha-Beta pruning
            }
            return minScore;
        }
    }

    getRandomMove() {
        const availableMoves = this.getAvailableMoves();
        return availableMoves.length > 0 ? availableMoves[Math.floor(Math.random() * availableMoves.length)] : -1;
    }

    getAvailableMoves() {
        return this.board.map((cell, index) => cell === '' ? index : -1).filter(index => index !== -1);
    }

    getAvailableMovesForAI(board) {
        return board.map((cell, index) => cell === '' ? index : -1).filter(index => index !== -1);
    }

    checkWinner() {
        for (let combination of this.winningCombinations) {
            const [a, b, c] = combination;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.highlightWinningCells(combination);
                return true;
            }
        }
        return false;
    }

    checkWinnerForAI(board, player) {
        for (let combination of this.winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] === player && board[b] === player && board[c] === player) {
                return true;
            }
        }
        return false;
    }

    isBoardFull() {
        return this.board.every(cell => cell !== '');
    }

    isBoardFullForAI(board) {
        return board.every(cell => cell !== '');
    }

    highlightWinningCells(combination) {
        combination.forEach(index => {
            const cell = document.querySelector(`[data-index="${index}"]`);
            cell.classList.add('winning');
        });
    }

    updateCell(index, player) {
        const cell = document.querySelector(`[data-index="${index}"]`);
        cell.textContent = player;
        cell.classList.add(player.toLowerCase());
        
        // Add particle effect
        this.addParticleEffect(cell, player);
    }

    addParticleEffect(cell, player) {
        const colors = player === 'X' ? ['#ff6b6b', '#ff8e8e'] : ['#4ecdc4', '#6ee7df'];
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
            `;
            
            const rect = cell.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            
            document.body.appendChild(particle);
            
            const angle = (i / 8) * Math.PI * 2;
            const velocity = 50;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            let opacity = 1;
            const animate = () => {
                opacity -= 0.02;
                particle.style.opacity = opacity;
                particle.style.left = (parseFloat(particle.style.left) + vx * 0.1) + 'px';
                particle.style.top = (parseFloat(particle.style.top) + vy * 0.1) + 'px';
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    particle.remove();
                }
            };
            
            requestAnimationFrame(animate);
        }
    }

    handleGameEnd(winner) {
        this.gameActive = false;
        this.gamesPlayed++;

        if (winner === 'player') {
            this.scores.player++;
            this.playSound('win');
            this.showModal('Congratulations!', 'You won! 🎉', 'player');
        } else if (winner === 'ai') {
            this.scores.ai++;
            this.playSound('lose');
            this.showModal('Game Over!', 'AI wins! 🤖', 'ai');
        } else {
            this.playSound('draw');
            this.showModal('It\'s a Draw!', 'Well played! 🤝', 'draw');
        }

        this.updateDisplay();
    }

    showModal(title, message, winner) {
        const modal = document.getElementById('victory-modal');
        const modalTitle = document.getElementById('modal-title');
        const winnerText = document.getElementById('winner-text');
        const winnerDisplay = document.getElementById('winner-display');

        modalTitle.textContent = title;
        winnerText.textContent = message;

        // Update winner display styling
        winnerDisplay.className = 'winner-display';
        if (winner === 'player') {
            winnerDisplay.style.color = '#ff6b6b';
        } else if (winner === 'ai') {
            winnerDisplay.style.color = '#4ecdc4';
        } else {
            winnerDisplay.style.color = '#ffd700';
        }

        modal.style.display = 'block';
    }

    closeModal() {
        document.getElementById('victory-modal').style.display = 'none';
    }

    newGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.moveCount = 0;
        
        // Clear board
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.textContent = '';
            cell.className = 'cell';
        });

        this.updateDisplay();
        this.updateStatus();
    }

    resetScores() {
        this.scores = { player: 0, ai: 0 };
        this.gamesPlayed = 0;
        this.updateDisplay();
    }

    updateDisplay() {
        document.getElementById('player-score').textContent = this.scores.player;
        document.getElementById('ai-score').textContent = this.scores.ai;
        document.getElementById('move-count').textContent = this.moveCount;
        document.getElementById('games-played').textContent = this.gamesPlayed;
    }

    updateStatus() {
        const status = document.getElementById('status');
        if (this.currentPlayer === 'X') {
            status.textContent = 'Your Turn (X)';
            status.style.color = '#ff6b6b';
        } else {
            status.textContent = 'AI Thinking... (O)';
            status.style.color = '#4ecdc4';
        }
    }

    addSoundEffects() {
        // Create audio context for sound effects
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    playSound(type) {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        switch (type) {
            case 'move':
                oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);
                break;
            case 'win':
                oscillator.frequency.setValueAtTime(523, this.audioContext.currentTime);
                oscillator.frequency.setValueAtTime(659, this.audioContext.currentTime + 0.1);
                oscillator.frequency.setValueAtTime(784, this.audioContext.currentTime + 0.2);
                break;
            case 'lose':
                oscillator.frequency.setValueAtTime(784, this.audioContext.currentTime);
                oscillator.frequency.setValueAtTime(659, this.audioContext.currentTime + 0.1);
                oscillator.frequency.setValueAtTime(523, this.audioContext.currentTime + 0.2);
                break;
            case 'draw':
                oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime);
                oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime + 0.2);
                break;
        }

        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.3);
    }

    // Add keyboard support
    addKeyboardSupport() {
        document.addEventListener('keydown', (e) => {
            if (!this.gameActive) return;

            const key = e.key;
            let index = -1;

            // Number keys 1-9 for board positions
            if (key >= '1' && key <= '9') {
                index = parseInt(key) - 1;
            }
            // Numpad keys
            else if (key >= '1' && key <= '9' && e.location === 3) {
                index = parseInt(key) - 1;
            }

            if (index >= 0 && index < 9 && this.board[index] === '') {
                this.makeMove(index);
            }

            // Spacebar for new game
            if (key === ' ') {
                e.preventDefault();
                this.newGame();
            }

            // R key for reset scores
            if (key === 'r' || key === 'R') {
                this.resetScores();
            }
        });
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new TicTacToeGame();
    game.addKeyboardSupport();
    
    // Add some cool initial animations
    setTimeout(() => {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            setTimeout(() => {
                cell.style.opacity = '0';
                cell.style.transform = 'scale(0.8)';
                cell.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    cell.style.opacity = '1';
                    cell.style.transform = 'scale(1)';
                }, 100);
            }, index * 50);
        });
    }, 500);
});

// Add some cool background effects
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    document.documentElement.style.setProperty('--mouse-x', x);
    document.documentElement.style.setProperty('--mouse-y', y);
});

// Add CSS custom properties for mouse tracking
const style = document.createElement('style');
style.textContent = `
    :root {
        --mouse-x: 0.5;
        --mouse-y: 0.5;
    }
    
    body::before {
        background: 
            radial-gradient(circle at calc(var(--mouse-x) * 100%) calc(var(--mouse-y) * 100%), rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%);
    }
`;
document.head.appendChild(style); 