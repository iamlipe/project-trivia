import React from 'react';
import { connect } from 'react-redux';

class GameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.renderGame = this.renderGame.bind(this);
  }

  renderGame() {
    const { answer: { answer } } = this.props;
    return (
      <div>
        <h1 data-testid="question-category">{answer[0].category}</h1>
        <h1 data-testid="question-text">{answer[0].question}</h1>
        <button
          type="button"
          data-testid="correct-answer"
        >
          {answer[0].correct_answer}
        </button>
        {answer[0].incorrect_answers.map(
          (item, index) => <button data-testid={ `wrong-answer-${index}` } type="button" key={ index }>{item}</button>,
        )}
      </div>
    );
  }

  render() {
    const { answer: { isLoading } } = this.props;
    return (
      isLoading === true ? <h1>Oi</h1> : this.renderGame()
    );
  }
}

const mapStateToProps = (state) => ({
  answer: state.game,
});

export default connect(mapStateToProps, null)(GameScreen);
