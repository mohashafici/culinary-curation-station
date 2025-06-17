
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

interface APIResponse {
  meals: any[] | null;
}

const parseIngredients = (meal: any): Ingredient[] => {
  const ingredients: Ingredient[] = [];
  
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure ? measure.trim() : ''
      });
    }
  }
  
  return ingredients;
};

const transformMeal = (mealData: any): Meal => {
  return {
    idMeal: mealData.idMeal,
    strMeal: mealData.strMeal,
    strMealThumb: mealData.strMealThumb,
    strArea: mealData.strArea,
    strCategory: mealData.strCategory,
    strInstructions: mealData.strInstructions,
    strYoutube: mealData.strYoutube,
    ingredients: parseIngredients(mealData)
  };
};

export const useMealAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomMeal = async (): Promise<Meal | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const data: APIResponse = await response.json();
      
      if (data.meals && data.meals.length > 0) {
        return transformMeal(data.meals[0]);
      }
      
      throw new Error('No meal data received');
    } catch (err) {
      const errorMessage = 'Failed to fetch random meal. Please try again.';
      setError(errorMessage);
      console.error('Error fetching random meal:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const searchMeals = async (query: string): Promise<Meal[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);
      const data: APIResponse = await response.json();
      
      if (data.meals && data.meals.length > 0) {
        return data.meals.map(transformMeal);
      }
      
      return [];
    } catch (err) {
      const errorMessage = 'Failed to search meals. Please try again.';
      setError(errorMessage);
      console.error('Error searching meals:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchMealById = async (id: string): Promise<Meal | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data: APIResponse = await response.json();
      
      if (data.meals && data.meals.length > 0) {
        return transformMeal(data.meals[0]);
      }
      
      return null;
    } catch (err) {
      const errorMessage = 'Failed to fetch meal details. Please try again.';
      setError(errorMessage);
      console.error('Error fetching meal by ID:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    fetchRandomMeal,
    searchMeals,
    fetchMealById
  };
};
