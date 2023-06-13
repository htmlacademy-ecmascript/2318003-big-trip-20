const capitalize = (str) => (str[0].toUpperCase() + str.slice(1));

const updatePoint = (points, update) => points.map((point) => point.id === update.id ? update : point);

export {capitalize, updatePoint};
