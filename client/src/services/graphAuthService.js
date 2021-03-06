

export default class graphAuthService {
    constructor() {
        //первая часть запроса
        this._apiBase = '/users/'
    }

    logIn = async (login, password) => {
        const query = `
            query{
                login(login:"${login}", password: "${password}"){
                    login
                }
            }
        `;
        const url = "/graph";
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query })
        };
        const res = await fetch(url, opts)
        return await res.json()
    }

    signUp = async (login, password) => {
        const query = `
            mutation{
                    signup(login:"${login}", password:"${password}"){
                login
            }
          }
        `;
        const url = "/graph";
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query })
        };
        const res = await fetch(url, opts)
        return await res.json()
    }

    logOut = async () => {
        const query = `
            query{
                    logout{
                login
            }
          }
        `;
        const url = "/graph";
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query })
        };
        const res = await fetch(url, opts)
        return await res.json()
    }

    check = async () => {
        const query = `
            query{
                    check{
                login
            }
          }
        `;
        const url = "/graph";
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query })
        };
        const res = await fetch(url, opts)
        return await res.json()
    }
}