import Strings from './Strings'
import {uni2cript} from '../Utilities/uni2cript';


export function get(key){
    return (Strings.lang == 'en' ? Strings.en.key : Strings.ta.key)
}
export function translate(string){
    return (Strings.lang == 'en' ? string : uni2cript(Strings.ta.key))
}
