const proxy = 'https://cors-anywhere.herokuapp.com/';

async function login() {
  const res = await fetch(proxy + 'http://api.cup2022.ir/api/v1/user/login', {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': 'http://127.0.0.1:5500/',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      email: 'email@mail.com',
      password: '12345678',
    }),
  });

  const data = await res.json(); // { data : { token : 'aaa'}, status }

  return data.data.token;
}
