
import React from 'react';
import { Heart, ExternalLink, MapPin, Tag } from 'lucide-react';
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

interface MealCardProps {
  meal: Meal;
  onFavorite: (meal: Meal) => void;
  isFavorited: boolean;
}

const MealCard: React.FC<MealCardProps> = ({ meal, onFavorite, isFavorited }) => {
  const handleYouTubeClick = () => {
    if (meal.strYoutube) {
      window.open(meal.strYoutube, '_blank');
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl border border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl">
      <div className="relative">
        <img 
          src={meal.strMealThumb} 
          alt={meal.strMeal}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            onClick={() => onFavorite(meal)}
            variant="secondary"
            size="sm"
            className={`backdrop-blur-md ${isFavorited ? 'bg-red-500/80 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </Button>
          {meal.strYoutube && (
            <Button
              onClick={handleYouTubeClick}
              variant="secondary"
              size="sm"
              className="backdrop-blur-md bg-white/20 text-white hover:bg-white/30"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-3">{meal.strMeal}</h2>
        
        <div className="flex items-center gap-4 mb-4 text-orange-200">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{meal.strArea}</span>
          </div>
          <div className="flex items-center gap-1">
            <Tag className="w-4 h-4" />
            <span className="text-sm">{meal.strCategory}</span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Ingredients</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {meal.ingredients.map((ingredient, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-2 text-sm text-orange-100">
                <span className="font-medium">{ingredient.measure}</span> {ingredient.name}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Instructions</h3>
          <div className="text-orange-100 text-sm leading-relaxed max-h-40 overflow-y-auto bg-white/5 rounded-lg p-4">
            {meal.strInstructions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
