import React, { FunctionComponent, useEffect, useState } from 'react';

import * as Models from './../models';
import Card from './Card';
import './Main.scss';

const MainContainer: FunctionComponent<{ initial?: Models.QuizResponse; }> = ({ initial }) => {
  // Below is one way state is set using React Hooks, where the first deconstructed variable`quizzes` is the state variable name 
  // and `setQuizzes` is the methodName called to update the quizzes state if needed. Here, use it after the data is fetched successfully. 
  const [quizzes, setQuizzes] = useState(initial);
  const [shouldShowCards, setShouldShowCards] = useState(false);

  const fetchData = async (): Promise<void> => {
    const res = await fetch('https://opentdb.com/api.php?amount=10&type=boolean');
    res.json()
      .then((res) => setQuizzes(res))
      .catch((err) => console.log(err));
  };

  // useEffect is a React hook equivalent to React Lifecycle Method (RLM) componenDidMount() among other RLMs
  useEffect(() => {
    // fetchData();
    setQuizzes({
      "response_code": 0,
      "results": [{
        "category": "Entertainment: Television",
        "type": "boolean",
        "difficulty": "medium",
        "question": "There will be a sequel to Bloodborne.",
        "correct_answer": "False",
        "incorrect_answers": ["True"]
      },
      {
        "category": "Entertainment: Television",
        "type": "boolean",
        "difficulty": "medium",
        "question": "By the time of episode 6 Darth Vader is 70 years old!.",
        "correct_answer": "False",
        "incorrect_answers": ["True"]
      },
      {
        "category": "Entertainment: Television",
        "type": "boolean",
        "difficulty": "medium",
        "question": "There are Black Lightsabers in the original trilogy.",
        "correct_answer": "False",
        "incorrect_answers": ["True"]
      },
      {
        "category": "Entertainment: Television",
        "type": "boolean",
        "difficulty": "medium",
        "question": "A New Hope came out in 1977.",
        "correct_answer": "True",
        "incorrect_answers": ["False"]
      },
      {
        "category": "Entertainment: Television",
        "type": "boolean",
        "difficulty": "medium",
        "question": "Darth Maul is a Zabrak!",
        "correct_answer": "True",
        "incorrect_answers": ["False"]
      },
      {
        "category": "Entertainment: Television",
        "type": "boolean",
        "difficulty": "medium",
        "question": "Purple is the rarest lightsaber color!",
        "correct_answer": "False",
        "incorrect_answers": ["True"]
      },
      {
        "category": "Entertainment: Television",
        "type": "boolean",
        "difficulty": "medium",
        "question": "The actor that played Count Dooku is still alive!",
        "correct_answer": "False",
        "incorrect_answers": ["True"]
      },
      {
        "category": "Entertainment: Television",
        "type": "boolean",
        "difficulty": "medium",
        "question": "Luke has a Wife in Canon.",
        "correct_answer": "False",
        "incorrect_answers": ["True"] 
      },
      {
        "category": "Entertainment: Television",
        "type": "boolean",
        "difficulty": "medium",
        "question": "Clone Wars is Canon.",
        "correct_answer": "True",
        "incorrect_answers": ["False"] 
      },
      {
        "category": "Entertainment: Television",
        "type": "boolean",
        "difficulty": "medium",
        "question": "Ther always were only 2 Sith at once.",
        "correct_answer": "False",
        "incorrect_answers": ["True"] 
      },
      {
        "category": "Entertainment: Television",
        "type": "boolean",
        "difficulty": "medium",
        "question": "Nobody before Anakin knew that Palpatine was secretly a Sith Lord.",
        "correct_answer": "False",
        "incorrect_answers": ["True"] 
      },
      {
        "category": "Entertainment: Television",
        "type": "boolean",
        "difficulty": "medium",
        "question": "Palpatine killde his family when he was a child.",
        "correct_answer": "True",
        "incorrect_answers": ["False"] 
      },
      {
        "category": "Entertainment: Television",
        "type": "boolean",
        "difficulty": "medium",
        "question": "Anakin regreted becoming Vader.",
        "correct_answer": "True",
        "incorrect_answers": ["False"] 
      }
    ]
    })
  }, []);

  const handleButtonClick = (): void => {
    setShouldShowCards(true);
  };

  return (
    <main className='Main'>
      {!shouldShowCards ? (
        <>
          <h2>Welcome to the Trivia Challenge!</h2>
          <div className='StartEndCard'>
            <h2>You will answer 13 of the most rando true or false questions</h2>
            <p>Can you score 13/13?</p>

            <button type='submit' className='Button' onClick={() => handleButtonClick()}>Get Started!</button>
          </div>
        </>
      ) : <Card quizQuestions={quizzes} />}
    </main>
  );
};

export default MainContainer;
