import app from '../api/index.js'

app.listen(app.get('port'), function() {
  console.log('Server is running on port', app.get('port'));
});
