const serve = require('serve');
const path = require('path');

serve(path.resolve(__dirname, 'build'), {
  port: 80,
});
