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
    // Rendezia o quadrado
    renderQuadrado(i){
        return (
            <Quadrado
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }
    // Cria os quadrados
    RenderizarTab(_AParam){
        for (let i = 0; i < 2; i++) {
            var _ArrayQuadrado = <div className='board-now'>{this.renderQuadrados(_AParam)}</div>
        }
        return _ArrayQuadrado;
    }
    renderQuadrados(_AParam){
        const _Array = [];
        for (let i = _AParam[0]; i <= _AParam[1]; i++) {
            _Array.push(this.renderQuadrado(i))
        }
        return _Array;
    }

    
    render() {
        return (
            <div>
                {this.RenderizarTab([0,2])}
                {this.RenderizarTab([3,5])}
                {this.RenderizarTab([6,8])}
            </div>
        );
    }
}

class Jogo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xProximo: true,
            passo : 0,
        };
    }

    handleClick(i){
        const historico = this.state.history.slice(0, this.state.passo + 1);
        const atual = historico[historico.length - 1]
        const squares = atual.squares.slice();
        if (calcularVencedor(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.xProximo ? 'X' : 'O';
        this.setState({
            history: historico.concat([{
                squares: squares
            }]),
            passo : historico.length,
            xProximo: !this.state.xProximo,
        });
    }

    jumpTo(step){
        this.setState({
            passo: step,
            // Define para true se step for par
            xProximo: (step % 2) === 0
        })
    }

    render() {
        const historico = this.state.history.slice();
        const atual = historico[this.state.passo]
        const ganhador = calcularVencedor(atual.squares);

        const movimentos = historico.map((step, move) => {
            const desc = move ?
            'Vá para o movimento #' + move :
            'Vá para o início do jogo';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })
        let status;
        // Verifica se tem um vencedor
        if (ganhador) {
            status = 'Vencedor: ' + ganhador;
        }else {
            // Informa a vez do jogador através da property xProximo
            status = 'Próximo jogador: ' + (this.state.xProximo ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Tabuleiro
                        squares={atual.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{movimentos}</ol>
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