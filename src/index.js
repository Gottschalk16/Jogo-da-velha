import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component{
    constructor(props){
        // Sempre que definir um constructor deve ser chamado o super de uma subclasse
        // Todos os componentes de class React que possuem um método constructor devem iniciá-lo com uma chamada super(props)
        super(props);
        this.state = {
            value: null,
        };
    }
    render(){
        return(
            <button
                className="square" 
                onClick={() => this.props.onClick()}>
                { this.props.value }
            </button>
        );
    }
}

class Board extends React.Component{
    constructor(props){
        super(props);
        // Array de 9 posições nulas
        this.state = {
            squares : Array(9).fill(null),
        };
    }

    renderSquare(i){
        return (
            <Square 
                value={this.state.squares[i]} 
                onClick={() => this.handleClick(i)}
                />
        );
    }

    render() {
        const status = 'Next player: X';

        return (
            <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
            </div>
            <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
            </div>
            <div className="board-row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
            </div>
            </div>
        );
    }
}

class Game extends React.Component{
    render(){
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/*status*/}</div>
                    <ol>{/* Alguma coisa */}</ol>
                </div>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);