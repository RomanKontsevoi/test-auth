interface LoginByAuthCodeOptions {
  code: string
}

export const loginByAuthCode = async (options: LoginByAuthCodeOptions) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_AAM_BACKEND_URL}/auth/login/tokens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(options)
    })

    return await res.json()
  } catch (e) {
    console.error(e)
    throw e
  }
}

export async function refreshAccessToken(refresh_token: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_AAM_BACKEND_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refresh_token })
    });

    return await response.json();
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
}
