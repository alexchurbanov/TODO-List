import regeneratorRuntime from "regenerator-runtime";

async function postData(url = '', data = {}, method = 'POST') {
    const response = await fetch(url, {
      method,
      mode: 'cors', 
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      body: JSON.stringify(data)
    });
    return await response.json();
}

export default postData;