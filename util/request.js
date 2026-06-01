import urlcat from 'urlcat';

const request = async (url, { method = 'GET', params, body } = {}) => {
    // 从环境变量中获取API基础URL
    const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com';
    // 使用urlcat构建完整的请求URL
    const requestUrl = urlcat(apiUrl, url, params);

    console.log('请求URL:', requestUrl);

    // 请求头
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };

    const options = {
        method,
        headers,
        ...(body ? { body: JSON.stringify(body) } : {}),
    };

    const response = await fetch(requestUrl, options);

    if (!response.ok) {
        const { message, errors } = await response.json().catch(() => null);
        const error = new Error(message || '请求失败');
        error.status = response.status;
        error.errors = errors;
        throw error;
    }

    return await response.json();
};

export default request;

// GET请求示例
export const get = (url, params) => request(url, { params });

// POST请求示例
export const post = (url, body) => request(url, { method: 'POST', body });

// PUT请求示例
export const put = (url, body) => request(url, { method: 'PUT', body });

// DELETE请求示例
export const del = (url) => request(url, { method: 'DELETE' });
