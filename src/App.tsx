
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  Default = 'DEFAULT',
  Alphabetical = 'ALPHABETICAL',
  Length = 'LENGTH',
  Reverse = 'REVERSE',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Default);

  const handleSortChange = (type: SortType) => {
    setSortType(type);
  };

  const getSortedGoods = () => {
    switch (sortType) {
      case SortType.Alphabetical:
        // Criando a cópia e ordenando imediatamente como o mentor sugeriu
        return [...goodsFromServer].sort((a, b) => a.localeCompare(b));
      case SortType.Length:
        return [...goodsFromServer].sort((a, b) => a.length - b.length);
      case SortType.Reverse:
        return [...goodsFromServer].reverse();
      case SortType.Default:
      default:
        return [...goodsFromServer];
    }
  };

  const visibleGoods = getSortedGoods();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== SortType.Alphabetical ? 'is-light' : ''}`}
          onClick={() => handleSortChange(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== SortType.Length ? 'is-light' : ''}`}
          onClick={() => handleSortChange(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${sortType !== SortType.Reverse ? 'is-light' : ''}`}
          onClick={() => handleSortChange(SortType.Reverse)}
        >
          Reverse
        </button>

        {/* Renderização condicional: o botão Reset só aparece se a ordenação não for Default */}
        {sortType !== SortType.Default && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => handleSortChange(SortType.Default)}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
