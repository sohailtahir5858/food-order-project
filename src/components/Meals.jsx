import useHttp from "../hooks/useHttp";
import Error from "./Error";
import MealItem from './MealItem';

const requestConfig = [];
function Meals() {
  const {
    data: meals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    return <p className="center">fetching data ...</p>;
  }

  if(error){
    return <Error title="failed to fetch meals" message={error}/>
  }

  return (
    <ul id="meals">
      {meals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}

export default Meals;
