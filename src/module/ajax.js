(function() {
    const noop = () => null;

    class AjaxModule {

        _fetch(url = "http://93.171.139.196:780/",
               params = {},
        ) {
            return fetch(url, { method: "GET",  credentials: "include", keepalive: true});
        }

        _fetchPost(
            url = "http://93.171.139.196:780/",
            params = {withCredentials: true, credentials: "same-origin"},
            body = {}) {
            body = JSON.stringify(body);
            return this._fetch(url, "POST", params, body);
        }

        _fetchGet(url = "http://93.171.139.196:780/",
                  params = { credentials: "same-origin", keepalive: true},
                  ){
            fetch(url, { method: "GET",  credentials: "same-origin", keepalive: true})
            return this._fetch(url, "GET", params);
        }

    }

    globalThis.AjaxModule = new AjaxModule();
})();