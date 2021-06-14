import _ from 'lodash';
import React, { useState } from 'react';

import * as Models from './../models';
import './Card.scss';

interface Props {
    quizQuestions?: Models.QuizResponse;
}
    const shuffle = (array: any[]) => {
  var currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
interface State {
    currentIndex: number,
    score: number,
    showFinished: boolean,
    answered: boolean,
    selectedOption: string,
    revealAnswer: string,
    shuffledAnswers: string[]
}
const Card = (props: Props) => {
    const quizQuestions = _.get(props, 'quizQuestions.results', []);
    // Here is another way to set state using React Hooks. This is a neater approach than setting them individually like you'll see
    // in Main.tsx. This approach is great for larger states.
    const initialState: State = {
        currentIndex: 0,
        score: 0,
        showFinished: false,
        answered: false,
        selectedOption: '',
        revealAnswer: '',
        shuffledAnswers:  [], // shuffle([quizQuestions[0].correct_answer, ...quizQuestions[0].incorrect_answers])
    };

    // These two variable below can be called anything, but we'll name them `state` and `setState` for convention.
    const [state, setState] = useState(initialState);
    // These are variables that we'll refer to throughout this component, so we'll set them on state here. If there are variables you
    // are not referring to outside of the setState({}) funciton elsewhere, they dont need to be delcared here, but can be just set above.
    const {
        currentIndex,
        score,
        revealAnswer,
        selectedOption,
        shuffledAnswers,
    } = state;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, correctAnswer: Models.Quiz): void => {
        e.persist();
        e.preventDefault();
        const isCorrect: boolean = e.target.id.includes(correctAnswer.toString()) ? true : false;
        const renderAnswer: string = isCorrect ? 'Correct!' : 'Sorry, wrong answer!';

        setState({
            ...state,
            selectedOption: e.target.id.toString(),
            answered: isCorrect ? true : false,
            revealAnswer: renderAnswer
        });

        if (currentIndex + 1 > quizQuestions.length) {
            setState({ ...state, showFinished: true });
        } else {
            // delay for question auto-advance, to display 'Correct' or 'Incorrect' feedback
            setTimeout(() => {
                setState({ ...state, score: isCorrect ? score + 1 : score + 0, currentIndex: currentIndex + 1, revealAnswer: '', shuffledAnswers: [] });
            }, 2000);
        }
    };

    const renderAnswer = (): React.ReactFragment => {
        return (
                <>{revealAnswer}</>
        );
    };

    const renderQuestions = (): React.ReactFragment[] => {
        if (shuffledAnswers.length === 0) {
            setState({...state, shuffledAnswers: shuffle([
                quizQuestions[currentIndex].correct_answer, ...quizQuestions[currentIndex].incorrect_answers])})
        }
        const answers=shuffledAnswers

        return  answers.map((answer, index) => (
                <div className='inputGroup' role='radiogroup'>
                <label id='label' htmlFor={answer} className='container'>
                <input id={answer} name='radio' type='radio' checked={selectedOption === answer}  onChange={(e) => handleChange(e, quizQuestions[currentIndex].correct_answer)}/>{answer}<span className='checkmark'></span>
                </label>
                </div>
        ))
    }

    return (
        quizQuestions && quizQuestions.length > 0 && (currentIndex < quizQuestions.length) ?
            <div>
            <h2>{quizQuestions[currentIndex].category}</h2>
            <main className='Card'>
            <h1>{_.unescape(quizQuestions[currentIndex].question)}</h1>
            <div>Difficulty: {quizQuestions[currentIndex].difficulty}</div>
            </main>

            <section>
            <div className='Answer'>{renderAnswer()}</div>
            <form className='form'>

            <div>{renderQuestions()}</div>

            </form>
            </section>

            <footer className='Badge'>
            Question {currentIndex + 1}/{quizQuestions.length}
        </footer>
            </div>
            :
            <div>
            <main className='Card'>
            <h3>
            You scored {score} / {quizQuestions.length}
        </h3>

            <button className='Button' type='reset' onClick={() => setState(initialState)}>
            Start Over
        </button>
            </main >
            </div>
    );
};

export default Card;
