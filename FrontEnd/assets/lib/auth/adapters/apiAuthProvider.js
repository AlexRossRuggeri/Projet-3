// TODO: Quand ça sera à connecter avec l'API, faire la même chose que fakeLogin mais en faisant des appels http vers le serveur.

// async function login(email, password) {
//     if (email != undefined && password != undefined) {
//       data = { username: email, password: password };
//       body = JSON.stringify(data);
//     } else {
//       return false;
//     }

//     response = await fetch("http://localhost:5678/api/users/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: body,
//     });
