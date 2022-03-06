import { defineStore } from 'pinia';

export const useCitiesStore = defineStore('cities', {
  state: () => {
    return {
      cities: [
        'San Jose',
        'Santiago',
        'San Francisco',
        'Santa Rosa',
        'San Juan',
        'Sabadell',
        'Salamanca',
        'Salt Lake City',
        'Salinas',
        'Salem',
        'Sausalito',
        'Taipei',
        'Tel Aviv',
        'Tempe',
        'Termez',
        'Temuco',
        'Tiajuna',
        'Tieling',
        'Thousand Oaks',
        'Thunder Bay',
        'Tokyo',
        'Tulsa',
      ],
    };
  },
});
