import classNames from 'classnames';

export const makeClassBasingOnPath = (path, firstClass, secondClass) => {
  const currentLocation = window.location.pathname;
  let className = firstClass;

  if (
    ((currentLocation ? currentLocation.includes(path) : false) &&
      path !== '/') ||
    (path === '/' && currentLocation === path)
  ) {
    className = classNames(firstClass, secondClass);
  }

  return className;
};
