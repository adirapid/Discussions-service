module.exports = ({ status, source, title, details }) => ({
  status,
  source: { pointer: source },
  title,
  details
});
