(function() {
    const noop = () => null;

    class AjaxModule {

        _fetch(url = "http://93.171.139.196:780/",
               method ="GET",
               params = {},
               body = null) {
            return fetch(url, {method, params, body});
        }

        _fetchPost(
            url = "http://93.171.139.196:780/",
            params = {withCredentials: true, credentials: "same-origin"},
            body = {}) {
            body = JSON.stringify(body);
            return this._fetch(url, "POST", params, body);
        }

        _fetchGet(url = "http://93.171.139.196:780/",
                  params = {withCredentials: true, credentials: "same-origin"},
                  ){
            return this._fetch(url, "GET", params);
        }

    }

    globalThis.AjaxModule = new AjaxModule();
})();