function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}

const splitUrl = (link, segment) => {
  const lastSegment = link.split(segment).pop();
  return lastSegment;
};

export { capitalize, splitUrl };
