/**
 * ============================================================
 * Clinical Pharmacy Interventions V2
 * API Layer
 * ------------------------------------------------------------
 * Handles all communication with Google Apps Script.
 * ============================================================
 */

const Api = (() => {

    let config = {
        endpoint: "",
        token: "",
        timeout: 30000
    };

    function configure(endpoint, token) {
        config.endpoint = endpoint.trim();
        config.token = token.trim();
    }

    async function request(method, payload = {}) {

        if (!config.endpoint)
            throw new Error("API endpoint not configured.");

        const controller = new AbortController();

        const timer = setTimeout(() => controller.abort(), config.timeout);

        try {

            let response;

            if (method === "GET") {

                const url =
                    `${config.endpoint}?token=${encodeURIComponent(config.token)}`;

                response = await fetch(url, {
                    signal: controller.signal
                });

            } else {

                payload.__token = config.token;

                response = await fetch(config.endpoint, {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(payload),

                    signal: controller.signal

                });

            }

            clearTimeout(timer);

            if (!response.ok)
                throw new Error(response.statusText);

            return await response.json();

        }
        catch (err) {

            clearTimeout(timer);

            console.error(err);

            throw err;

        }

    }

    return {

        configure,

        getDatabase() {
            return request("GET");
        },

        saveDatabase(data) {
            return request("POST", data);
        }

    };

})();
