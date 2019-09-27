(function() {
    const noop = () => null;

    class AjaxModule {

        _fetch(url = "http://localhost:3000",
               method ="GET",
               params = {withCredentials: true, credentials: "same-origin"},
               body = {}){
            return  fetch(url, {method, params})

        }

        // _fetchPost(url = "http://localhost:3001/kek",
        //            method ="POST",
        //            params = {withCredentials: true, credentials: "same-origin"},
        //            body = {}){
        //     fetch(url, {method, params}).then(res => {
        //         return res.text();
        //     }).then(ans => console.log(JSON.parse(ans).misha));
        // }
        //
        // _fetchGet(url = "http://localhost:3001/kek",
        //           method ="POST",
        //           params = {withCredentials: true, credentials: "same-origin"},
        //           body = {}){
        //     fetch(url, {method, params}).then(res => {
        //         return res.text();
        //     }).then(ans => console.log(JSON.parse(ans).misha));
        // }

    }

    globalThis.AjaxModule = new AjaxModule();
})();