/**
 * マスキング
 * 
 * input  value マスキング対象
 *        num   表示文字数
 * output string
 */
export const maskify = (value, num) => {
    let result = "";

    if (num === 0) {
        result = '●'.repeat(Math.max(0, value.length));
    } else {
        result = '●'.repeat(Math.max(0, value.length - num)) + value.substr(-num);
    }
    return result;
};

/**  
 * DateTime→Stringへ変換
 * 
 * input  Date
 * output Stirng
 */
export const datetimeToString = (date) => {
    return date.getFullYear() + "-"
        + ("00" + (date.getMonth() + 1)).slice(-2) + "-"
        + ("00" + (date.getDate())).slice(-2) + " "
        + ("00" + (date.getHours())).slice(-2) + ":"
        + ("00" + (date.getMinutes())).slice(-2) + ":"
        + ("00" + (date.getSeconds())).slice(-2);
};

/**  
 * Date→Stringへ変換
 * 
 * input  Date
 * output Stirng
 */
export const dateToString = (date) => {
    return date.getFullYear() + "-"
        + ("00" + (date.getMonth() + 1)).slice(-2) + "-"
        + ("00" + (date.getDate())).slice(-2);
};