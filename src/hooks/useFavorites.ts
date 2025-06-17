
import { useState, useEffect } from 'react';

interface Ingredient {
  name: string;
  measure: string;
}

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea: string;
  strCategory: string;
  strInstructions: string;
  strYoutube?: string;
  ingredients: Ingredient[];
}

const FAVORITES_KEY = 'meal-app-favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Meal[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error);
        localStorage.removeItem(FAVORITES_KEY);
      }
    }
  }, []);

  const saveFavoritesToStorage = (favoritesArray: Meal[]) => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoritesArray));
  };

  const addFavorite = (meal: Meal) => {
    setFavorites(prev => {
      const isAlreadyFavorited = prev.some(fav => fav.idMeal === meal.idMeal);
      if (isAlreadyFavorited) return prev;
      
      const newFavorites = [...prev, meal];
      saveFavoritesToStorage(newFavorites);
      return newFavorites;
    });
  };

  const removeFavorite = (mealId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.filter(fav => fav.idMeal !== mealId);
      saveFavoritesToStorage(newFavorites);
      return newFavorites;
    });
  };

  const isFavorited = (mealId: string): boolean => {
    return favorites.some(fav => fav.idMeal === mealId);
  };

  const toggleFavorite = (meal: Meal) => {
    if (isFavorited(meal.idMeal)) {
      removeFavorite(meal.idMeal);
    } else {
      addFavorite(meal);
    }
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorited,
    toggleFavorite
  };
};
