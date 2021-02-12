/**
 * 全角カナ、半角カナチェック
 * 
 * input  value 対象文字列
 *        type  0:半角,1:全角
 * output boolean
 */
export const checkKana = (value, type) => {
    let result = false;

    if (type === 0) {
        result = !value.match(/^[ｦ-ﾟ]*$/);
    } else {
        result = !value.match(/^[ァ-ヶー　]*$/);
    }

    return result;
};

/**
 * 文字列長さチェック
 * 
 * input  value 対象文字列
 *        num   文字数
 * output boolean
 */
export const checkLength = (value, num) => {
    return value.length >= num;
};

/**
 * 数値チェック
 * 
 * input  value 対象値
 * output boolean
 */
export const checkNumber = (value) => {
    return value.match(/^[-]?\d*$/);
}

/**
 * 必須チェック
 * 
 * input  value 対象値
 * output boolean
 */
export const checkRequired = (value) => {
    return value.length > 0;
}