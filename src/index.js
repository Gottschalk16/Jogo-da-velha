import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Quadrado(props){
    return(
        <button
            className="square" 
            onClick={props.onClick}>
            { props.value }
        </button>
    );
}
class Tabuleiro extends React.Component{
    constructor(props){
        super(props);
        // Array de 9 posições nulas
        this.state = {
            squares : Array(9).fill(null),
            xProximo: true,
        };
    }

    handleClick(i){
        const squares = this.state.squares.slice();
        if (calcularVencedor(squares) || squares[i]){
            return;
        }
        // Verificando se o X é o próximo
        squares[i] = this.state.xProximo ? 'X' : 'O';
        this.setState({
            squares: squares,
            xProximo : !this.state.xProximo,
        });
    }

    renderQuadrado(i){
        return (
            <Quadrado 
                value={this.state.squares[i]} 
                onClick={() => this.handleClick(i)}
                />
        );
    }

    render() {
        const ganhador = calcularVencedor(this.state.squares);
        let status;
        // Verifica se tem um vencedor
        if (ganhador) {
            status = 'Vencedor: ' + ganhador;
        }else {
            // Informa a vez do jogador através da property xProximo
            status = 'Próximo jogador: ' + (this.state.xProximo ? 'X' : 'O');
        }
        

        return (
            <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {this.renderQuadrado(0)}
                {this.renderQuadrado(1)}
                {this.renderQuadrado(2)}
            </div>
            <div className="board-row">
                {this.renderQuadrado(3)}
                {this.renderQuadrado(4)}
                {this.renderQuadrado(5)}
            </div>
            <div className="board-row">
                {this.renderQuadrado(6)}
                {this.renderQuadrado(7)}
                {this.renderQuadrado(8)}
            </div>
            </div>
        );
    }
}

class Jogo extends React.Component{
    render(){
        return (
            <div className="game">
                <div className="game-board">
                    <Tabuleiro />
                </div>
                <div className="game-info">
                    <div>{}</div>
                    <ol>{}</ol>
                </div>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Jogo />);

function calcularVencedor(squares){
    const linhas = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [0, 4, 8]
    ];
    for (let i = 0; i < linhas.length; i++) {
        const [a, b, c] = linhas[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null;
}