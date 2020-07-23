const { join } = require('path');
function resolve(dir) {
  return join(__dirname, '../..', dir);
}
exports.resolve = function (dir) {
  return join(__dirname, '../..', dir);
};
