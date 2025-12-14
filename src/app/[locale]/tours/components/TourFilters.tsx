// src/app/[locale]/tours/components/TourFilters.tsx
'use client';

interface TourFiltersProps {
  selectedCategory: string;
  selectedDifficulty: string;
  onCategoryChange: (category: string) => void;
  onDifficultyChange: (difficulty: string) => void;
}

export default function TourFilters({
  selectedCategory,
  selectedDifficulty,
  onCategoryChange,
  onDifficultyChange,
}: TourFiltersProps) {
  const categories = [
    { value: 'all', label: 'All Tours' },
    { value: 'desert', label: 'Desert' },
    { value: 'mountains', label: 'Mountains' },
    { value: 'city', label: 'City Tours' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'adventure', label: 'Adventure' },
  ];

  const difficulties = [
    { value: 'all', label: 'All Levels' },
    { value: 'easy', label: 'Easy' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'challenging', label: 'Challenging' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
      {/* Category Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-text-primary mb-4 pb-2 border-b-2 border-primary/20">
          Category
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => onCategoryChange(category.value)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                selectedCategory === category.value
                  ? 'bg-primary text-white font-semibold'
                  : 'text-text-secondary hover:bg-background-cream'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty Filter */}
      <div>
        <h3 className="text-lg font-bold text-text-primary mb-4 pb-2 border-b-2 border-primary/20">
          Difficulty
        </h3>
        <div className="space-y-2">
          {difficulties.map((difficulty) => (
            <button
              key={difficulty.value}
              onClick={() => onDifficultyChange(difficulty.value)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                selectedDifficulty === difficulty.value
                  ? 'bg-primary text-white font-semibold'
                  : 'text-text-secondary hover:bg-background-cream'
              }`}
            >
              {difficulty.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}