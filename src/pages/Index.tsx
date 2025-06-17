
import React, { useState, useEffect } from 'react';
import { Shuffle, Moon, Sun, Search as SearchIcon, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import MealCard from '@/components/MealCard';
import SearchBar from '@/components/SearchBar';
import FavoritesList from '@/components/FavoritesList';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { useMealAPI } from '@/hooks/useMealAPI';
import { useFavorites } from '@/hooks/useFavorites';
import { useDarkMode } from '@/hooks/useDarkMode';

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

const Index = () => {
  const [currentMeal, setCurrentMeal] = useState<Meal | null>(null);
  const [searchResults, setSearchResults] = useState<Meal[]>([]);
  const [currentView, setCurrentView] = useState<'random' | 'search' | 'favorites'>('random');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { loading, error, fetchRandomMeal, searchMeals } = useMealAPI();
  const { favorites, toggleFavorite, isFavorited, removeFavorite } = useFavorites();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { toast } = useToast();

  useEffect(() => {
    loadRandomMeal();
  }, []);

  const loadRandomMeal = async () => {
    const meal = await fetchRandomMeal();
    if (meal) {
      setCurrentMeal(meal);
      setCurrentView('random');
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    const results = await searchMeals(query);
    setSearchResults(results);
    setCurrentView('search');
    
    if (results.length === 0) {
      toast({
        title: "No results found",
        description: `No meals found for "${query}". Try a different search term!`,
        variant: "destructive"
      });
    }
  };

  const handleClearSearch = () => {
    setSearchResults([]);
    setSearchQuery('');
    setCurrentView('random');
  };

  const handleFavoriteToggle = (meal: Meal) => {
    toggleFavorite(meal);
    const action = isFavorited(meal.idMeal) ? 'removed from' : 'added to';
    toast({
      title: `${meal.strMeal} ${action} favorites!`,
      description: isFavorited(meal.idMeal) ? "Removed from your favorites" : "Saved to your favorites",
    });
  };

  const handleSelectFavoriteMeal = (meal: Meal) => {
    setCurrentMeal(meal);
    setCurrentView('random');
  };

  const backgroundGradient = isDarkMode 
    ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900'
    : 'bg-gradient-to-br from-orange-400 via-red-500 to-pink-500';

  return (
    <div className={`min-h-screen ${backgroundGradient} relative overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M30 30c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
              <Button
                onClick={() => setCurrentView('random')}
                variant={currentView === 'random' ? 'default' : 'outline'}
                className={currentView === 'random' 
                  ? 'bg-white/20 text-white border-white/30' 
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }
              >
                <Shuffle className="w-4 h-4 mr-2" />
                Random
              </Button>
              <Button
                onClick={() => setCurrentView('search')}
                variant={currentView === 'search' ? 'default' : 'outline'}
                className={currentView === 'search' 
                  ? 'bg-white/20 text-white border-white/30' 
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }
              >
                <SearchIcon className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button
                onClick={() => setCurrentView('favorites')}
                variant={currentView === 'favorites' ? 'default' : 'outline'}
                className={currentView === 'favorites' 
                  ? 'bg-white/20 text-white border-white/30' 
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }
              >
                <Heart className="w-4 h-4 mr-2" />
                Favorites ({favorites.length})
              </Button>
            </div>
            
            <Button
              onClick={toggleDarkMode}
              variant="outline"
              size="sm"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            🍽️ Meal Discovery
          </h1>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Discover amazing recipes from around the world. Get surprised with random meals or search for your favorites!
          </p>
        </header>

        {/* Search Section */}
        {currentView === 'search' && (
          <div className="max-w-md mx-auto mb-8">
            <SearchBar 
              onSearch={handleSearch}
              onClear={handleClearSearch}
              isLoading={loading}
            />
          </div>
        )}

        {/* Main Content */}
        <main>
          {loading && <LoadingSpinner />}
          
          {error && (
            <ErrorMessage 
              message={error}
              onRetry={currentView === 'random' ? loadRandomMeal : undefined}
            />
          )}

          {/* Random Meal View */}
          {currentView === 'random' && !loading && !error && currentMeal && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-6">
                <Button
                  onClick={loadRandomMeal}
                  disabled={loading}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Shuffle className="w-5 h-5 mr-3" />
                  Surprise Me Again!
                </Button>
              </div>
              
              <MealCard
                meal={currentMeal}
                onFavorite={handleFavoriteToggle}
                isFavorited={isFavorited(currentMeal.idMeal)}
              />
            </div>
          )}

          {/* Search Results */}
          {currentView === 'search' && !loading && searchResults.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Search Results for "{searchQuery}" ({searchResults.length} found)
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                {searchResults.map((meal) => (
                  <MealCard
                    key={meal.idMeal}
                    meal={meal}
                    onFavorite={handleFavoriteToggle}
                    isFavorited={isFavorited(meal.idMeal)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* No Search Results */}
          {currentView === 'search' && !loading && searchQuery && searchResults.length === 0 && (
            <ErrorMessage 
              title="No meals found"
              message={`We couldn't find any meals matching "${searchQuery}". Try searching for ingredients like "chicken", "beef", or cuisines like "italian", "mexican".`}
              onRetry={() => handleClearSearch()}
              showRetry={true}
            />
          )}

          {/* Favorites View */}
          {currentView === 'favorites' && (
            <div className="max-w-7xl mx-auto">
              <FavoritesList
                favorites={favorites}
                onSelectMeal={handleSelectFavoriteMeal}
                onRemoveFavorite={removeFavorite}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
