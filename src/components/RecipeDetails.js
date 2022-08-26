import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import receitasContext from '../Context/ReceitasContext';

export default function RecipeDetails() {
  const { recipeDetail, getMeals, getDrinks, recipes } = useContext(receitasContext);
  const history = useHistory();
  const { pathname } = history.location;
  const splited = pathname.split('/');
  const numCarr = 6;

  const ingredient = () => {
    if (splited[1] === 'foods') {
      const magicIngre1 = (
        Object.keys(recipeDetail.meals[0])
          .indexOf('strIngredient1'));
      const magicIngre2 = (Object.keys(recipeDetail.meals[0]).indexOf('strIngredient20'));
      // getDrinks();
      return Object.values(recipeDetail.meals[0])
        .filter((a, i) => i <= magicIngre2 && i >= magicIngre1);
    }
    const magicDrink1 = (Object.keys(recipeDetail.drinks[0]).indexOf('strIngredient1'));
    const magicDrink2 = (Object.keys(recipeDetail.drinks[0]).indexOf('strIngredient15'));
    // getMeals();
    return Object.values(recipeDetail.drinks[0])
      .filter((a, i) => i <= magicDrink2 && i >= magicDrink1);
  };

  const measure = () => {
    if (splited[1] === 'foods') {
      const magicIngre1 = (Object.keys(recipeDetail.meals[0]).indexOf('strMeasure1'));
      const magicIngre2 = (Object.keys(recipeDetail.meals[0]).indexOf('strMeasure20'));
      return Object.values(recipeDetail.meals[0])
        .filter((a, i) => i <= magicIngre2 && i >= magicIngre1);
    }
    const magicDrink1 = (Object.keys(recipeDetail.drinks[0]).indexOf('strMeasure1'));
    const magicDrink2 = (Object.keys(recipeDetail.drinks[0]).indexOf('strMeasure15'));
    return Object.values(recipeDetail.drinks[0])
      .filter((a, i) => i <= magicDrink2 && i >= magicDrink1);
  };
  const ingredientes = ingredient().filter((a) => a !== null && a !== '');
  const medidas = measure().filter((a) => a !== null && a !== '');

  useEffect(() => {
    const indication = () => {
      if (splited[1] === 'foods') {
        getDrinks();
      } else {
        getMeals();
      }
    };

    indication();
  }, []);

  return (
    <div>
      { splited[1] === 'foods'

        ? (
          <div>
            <img
              data-testid="recipe-photo"
              src={ recipeDetail.meals[0].strMealThumb }
              width="200px"
              alt=""
            />
            <h2 data-testid="recipe-title">{recipeDetail.meals[0].strMeal}</h2>
            <h4 data-testid="recipe-category">{recipeDetail.meals[0].strCategory}</h4>

            <ul>
              {ingredientes.map((a, i) => (
                <li
                  key={ i }
                  data-testid={ `${i}-ingredient-name-and-measure` }
                >
                  {`${a} ${medidas[i]}`}

                </li>
              ))}

            </ul>

            <p data-testid="instructions">{recipeDetail.meals[0].strInstructions}</p>
            <iframe
              src={ recipeDetail.meals[0].strYoutube }
              title="youtubevideo"
              data-testid="video"
            />
            {recipes.drinks && recipes.drinks.filter((a, i) => i < numCarr).map(
              (el, ind) => (
                <div
                  data-testid={ `${ind}-recomendation-card` }
                  key={ ind }
                >
                  <p
                    data-testid={ `${ind}-recomendation-title` }
                  >
                    {el.strDrink}
                  </p>
                </div>),
            )}

          </div>)
        : (
          <div>

            <img
              data-testid="recipe-photo"
              src={ recipeDetail.drinks[0].strDrinkThumb }
              width="50px"
              alt=""
            />
            <h2 data-testid="recipe-title">{ recipeDetail.drinks[0].strDrink }</h2>
            <h4 data-testid="recipe-category">
              { recipeDetail.drinks[0].strCategory
            + recipeDetail.drinks[0].strAlcoholic }

            </h4>
            <ul>
              {ingredientes.map((a2, i2) => (
                <li
                  key={ i2 }
                  data-testid={ `${i2}-ingredient-name-and-measure` }
                >
                  {`${a2} ${medidas[i2]}`}

                </li>
              ))}

            </ul>
            <p data-testid="instructions">{ recipeDetail.drinks[0].strInstructions}</p>
            {recipes.meals && recipes.meals.filter((a, i) => i < numCarr).map(
              (el, ind) => (
                <div
                  data-testid={ `${ind}-recomendation-card` }
                  key={ ind }
                >
                  <p
                    data-testid={ `${ind}-recomendation-title` }
                  >
                    {el.strMeal}
                  </p>
                </div>),
            )}
          </div>)}
    </div>
  );
}
