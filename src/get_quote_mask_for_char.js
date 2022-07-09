import {is_a_letter} from ".//is_a_letter";

export function getQuoteMaskForCharacter(c, guesed_letters){
    if (guesed_letters.includes(c.toLowerCase()) || guesed_letters.includes(c.toUpperCase()) || !is_a_letter(c)){
        return c
    } else if (c === " "){
        return "  "
    } else{
        return "_ "
    }
}
