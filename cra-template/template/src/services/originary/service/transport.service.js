import axios from 'axios';
export default class TransportService {

    /**
     * Invoke the given method on the remote service endpoint.
     * @param {string} serviceEndpoint - The service url
     * @param {string|FormData} body - The body to pass
     * @param {Object} headers - The headers to pass
     * @returns {Promise} - The promise returned by the remote call
     */
     static async send(serviceEndpoint, body, headers) {
        axios.create({
            timeout: 2000,
            headers: headers,
            withCredentials: true,
            mode: 'cors'
        });

        try {
            const result = await axios.post(serviceEndpoint, body);
            result.data.response.content.serverTime = result.data.serverTime;
            return result.data.response.content;
        } catch (err) {
            // Handle Error Here
            console.error(err);
            throw err;
        }
    }
}