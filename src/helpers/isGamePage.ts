const isGamePage = (loc: Location) => {
  return (
    loc.pathname !== '/games' &&
    loc.pathname !== '/games/sprint' &&
    loc.pathname !== '/games/audiocall'
  );
};

export default isGamePage;
