export default class AuthService {
    constructor() {
        //первая часть запроса
        this._apiBase = '/users/'
    }

    logIn = async (login, password) => {
        const res = await fetch(this._apiBase + 'login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "login": login,
                "password": password
            })
        })
        // Обработка ошибок
        if (!res.ok) {
            throw new Error(`Could not fetch rcvd status ${res.status}`)
        }
        //Возвращаем уже сджсоненый объект        
        return await res.json()
    }

    signUp = async (login, password) => {
        const res = await fetch(this._apiBase + 'signup', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "login": login,
                "password": password
            })
        })
        // Обработка ошибок
        if (!res.ok) {
            throw new Error(`Could not fetch rcvd status ${res.status}`)
        }
        //Возвращаем уже сджсоненый объект
        return await res.json()
    }

    logOut = async () => {
        const res = await fetch(this._apiBase + 'logout')
        // Обработка ошибок
        if (!res.ok) {
            throw new Error(`Could not fetch rcvd status ${res.status}`)
        }
        //Возвращаем уже сджсоненый объект
        return await res.json()
    }

    check = async () => {
        const res = await fetch(this._apiBase + 'check')
        // Обработка ошибок
        if (!res.ok) {
            throw new Error(`Could not fetch rcvd status ${res.status}`)
        }
        //Возвращаем уже сджсоненый объект
        return await res.json({ isAuth: true })
    }
}