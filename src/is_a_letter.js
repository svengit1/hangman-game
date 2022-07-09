export function is_a_letter(char){
    if ((65 <= char.charCodeAt(0) && char.charCodeAt(0) <= 90 || 97 <= char.charCodeAt(0) &&  char.charCodeAt(0) <= 122)){
        return true
    } else{
        return false
    }
}
