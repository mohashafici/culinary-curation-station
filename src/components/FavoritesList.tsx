
import React from 'react';
import { Heart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

interface FavoritesListProps {
  favorites: Meal[];
  onSelectMeal: (meal: Meal) => void;
  onRemoveFavorite: (mealId: string) => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ 
  favorites, 
  onSelectMeal, 
  onRemoveFavorite 
}) => {
  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="w-16 h-16 text-orange-300 mx-auto mb-4 opacity-50" />
        <h3 className="text-xl font-semibold text-white mb-2">No favorites yet</h3>
        <p className="text-orange-200">Start exploring and save your favorite meals!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Heart className="w-6 h-6 text-red-400" />
        Your Favorite Meals ({favorites.length})
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {favorites.map((meal) => (
          <div
            key={meal.idMeal}
            className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg border border-white/20 transition-all duration-300 hover:scale-105 cursor-pointer group"
            onClick={() => onSelectMeal(meal)}
          >
            <div className="relative">
              <img 
                src={meal.strMealThumb} 
                alt={meal.strMeal}
                className="w-full h-32 object-cover"
              />
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFavorite(meal.idMeal);
                }}
                variant="secondary"
                size="sm"
                className="absolute top-2 right-2 backdrop-blur-md bg-red-500/80 text-white hover:bg-red-600/80 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-white text-sm mb-1 line-clamp-2">
                {meal.strMeal}
              </h3>
              <p className="text-orange-200 text-xs">
                {meal.strArea} • {meal.strCategory}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
