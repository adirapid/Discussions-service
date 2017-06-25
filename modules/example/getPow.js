/**
 * @function getPow
 * @memberOf Example
 * @description Just an example that pows a number
 * <p><i>GET /hello</i></p>
 * @param { num } - Number to multiply
 * @returns res num * num
 * <p></p>
 */

module.exports = function (req, res) {
  const { num } = req.params;
  res.status(200).send((num * num).toString());
};
