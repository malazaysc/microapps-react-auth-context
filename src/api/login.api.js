const LOGIN_API_ENDPOINT = process.env.NEXT_PUBLIC_AUTH_API_ENDPOINT_URL || 'http://localhost:8000/api/token/';

export async function loginApi(body) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(body);

    const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    let response;
    try {
        response = await fetch(LOGIN_API_ENDPOINT, requestOptions);
    } catch (error) {
        console.log(error);
        return null;
    }
    if (response.status === 200) {
        const data = await response.json();
        return {
            status: response.status,
            data,
        }
    }
    return {
        status: response.status,
        error: true,
    }
}