import app1  from './server';
import app2  from './login-server';

app1.listen(3001, function() {
  console.log('App1 listening on port 3001.');
});

app2.listen(3002, function() {
  console.log('App2 listening on port 3002.');
});
