import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSuggestion,
  selectError,
  selectLoading,
  selectSuggestion,
} from './suggestion.slice';
import './suggestion.css';

export default function Suggestion() {
  const { imageUrl, caption } = useSelector(selectSuggestion);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadSuggestion() {
      try {
        // Task 20: Dispatch the fetchSuggestion() action creator
        await dispatch(fetchSuggestion());
      } catch (error) {
        console.error('Error fetching suggestion:', error);
      }
    }
    loadSuggestion();
  }, [dispatch]);

  let render;
  if (loading) {
    render = <h3>Loading...</h3>;
  } else if (error) {
    render = <h3>Sorry, we're having trouble loading the suggestion.</h3>;
  } else {
    // Task 21: Enable the two JSX lines below needed to display the suggestion on the page
    render = (
      <>
        <p>Hello</p>
        <img alt={caption} src={imageUrl} />
        <p>{caption}</p> {/* Display the caption */}
      </>
    );
  }

  return (
    <section className="suggestion-container">
      <h2>Suggestion of the Day</h2>
      {render}
    </section>
  );
}