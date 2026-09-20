import { API_BASE_URL, TOKEN_STORAGE_KEY } from '@/config';

/**
 * কেন্দ্রীয় API রিকোয়েস্ট হেল্পার।
 * ব্যাকএন্ড (PHP) সবসময় { success: boolean, data, message, errors } ফরম্যাটে রেসপন্স দেয়।
 */
export async function apiRequest(path, { method = 'GET', body, auth = false, headers = {} } = {}) {
  const url = `${API_BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

  const finalHeaders = { Origin: (new URL(location.href)).origin, Accept: 'application/json', ...headers };

  if (auth) {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (token) finalHeaders['Authorization'] = `Bearer ${token}`;
  }

  // Avoid triggering a CORS preflight when possible: only unauthenticated,
  // non-FormData requests can safely use text/plain instead of application/json.
  const isSimple = body && !(body instanceof FormData) && !auth;
  if (body && !(body instanceof FormData)) {
    finalHeaders['Content-Type'] = isSimple ? 'text/plain' : 'application/json';
  }

  let res;
  try {
    res = await fetch(url, {
      method,//mode: 'no-cors',
      headers: finalHeaders,
      body: body ? (body instanceof FormData ? body : JSON.stringify(body)) : undefined
    });
  } catch (networkErr) {
    throw new ApiError('সার্ভারের সাথে সংযোগ করা যাচ্ছে না। ইন্টারনেট সংযোগ পরীক্ষা করুন।', 0, null);
  }

  let json = null;
  try {
    json = await res.json();
  } catch (e) {
    json = null;
  }

  if (!res.ok || !json || json.success === false) {
    const message = (json && (json.message || json.error)) || 'একটি সমস্যা হয়েছে, পরে আবার চেষ্টা করুন।';
    throw new ApiError(message, res.status, json ? json.errors : null);
  }

  return json.data !== undefined ? json.data : json;
}

export class ApiError extends Error {
  constructor(message, status, errors) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

export const api = {
  get: (path, opts) => apiRequest(path, { ...opts, method: 'GET' }),
  post: (path, body, opts) => apiRequest(path, { ...opts, method: 'POST', body }),
  put: (path, body, opts) => apiRequest(path, { ...opts, method: 'PUT', body }),
  //del: (path, opts) => apiRequest(path, { ...opts, method: 'DELETE' }),
  del: (path, opts) => apiRequest(path, { ...opts, method: 'POST' }),
};
