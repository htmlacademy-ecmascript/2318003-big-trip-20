const generateDestination = (city) => (
  {
    id: crypto.randomUUID(),
    name: city.name,
    description: city.description,
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
        description: `${city.name} description`
      }
    ]
  }
);

export {generateDestination};
