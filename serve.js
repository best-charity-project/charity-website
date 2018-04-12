const serve = require('serve');
const path = require('path');

serve(path.resolve(__dirname, 'build'), {
  port: process.env.PORT || 80,
});
