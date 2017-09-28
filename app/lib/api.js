import Strings from '../Utilities/Strings'

class Api {
    static headers(){
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'dataType': 'json',
            'Authorization': 'Bearer q1hkqkgokn2RxT_BkvzKNFu25EvEr-uoFEbvo1iYa4wQzWsnjy3EpjDTL58fXp6CTdyr7h9TABrmLYqRplRW5Tc0hOss5npF7Jzjst5ekY5RqsuPgTOwcFdGnOaoWXYx'
        }
    }
    static get(route) {
        return this.xhr(route, null, 'GET');
    }
    static put(route, params) {
        return this.xhr(route, params, 'PUT');
    }
    static post(route, params) {
        return this.xhr(route, params, 'POST');
    }
    static delete(route, params){
        return this.xhr(route, params, 'DELETE');
    }

    static xhr(route, params, method) {
        const host = Strings.apiUrl
        const url =`${host}${route}`
        let options = Object.assign({method: method}, params ? {body : JSON.stringify(params)} : null);
        options.headers = Api.headers()
        return fetch(url, options).then( resp => {
            let json = resp.json();
            if (resp.ok){
                return json;
            }
            return json.then(err => {throw err});
        })
    }
}

export default Api