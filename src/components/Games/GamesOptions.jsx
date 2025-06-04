import React from 'react';

export default function GamesOptions({ categories, filterCategory, selectedCategory }) {
  return (
    <div className="flex gap-4 justify-end flex-wrap">
      {categories.map((category) => {
        const isActive = selectedCategory === category;
        return (
          <button
            key={category}
            onClick={() => filterCategory(category)}
            className={`py-1 px-4 border rounded-xl transition-all duration-300 
              ${isActive 
                ? 'bg-purple-500 text-white border-purple-600 scale-110' 
                : 'hover:scale-110 hover:border-purple-300 text-neutral-400 cursor-pointer '
              }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        );
      })}
    </div>
  );
}
