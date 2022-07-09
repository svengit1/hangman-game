import {is_a_letter} from ".//is_a_letter"
export function uniqueCharacters(text){
    let set = new Set();
    for (let c of text){
        if (is_a_letter(c)){
            set.add(c)
        } 
    }
    console.log(set)
    return set.size
}
