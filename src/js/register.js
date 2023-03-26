/* You need to run this once to register */
async function register() {
  console.log('registering ...');
  const res = await fetch(
    'https://cors-anywhere.herokuapp.com/http://api.cup2022.ir/api/v1/user',
    {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5500/',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Name',
        email: 'email@mail.com',
        password: '12345678',
        passwordConfirm: '12345678',
      }),
    }
  );
  const data = await res.json();
  console.log(data);

  return data;
}
