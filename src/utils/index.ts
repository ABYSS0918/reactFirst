import { useEffect, useState } from "react";
export const isFalsy = (val: unknown) => (val === 0 ? false : !val);

///不可用直接赋值的方式改变传入的引用类型变量
export const cleanObject = (obj: object) => {
    const res = { ...obj }
    Object.keys(res).forEach((key) => {
        //@ts-ignore
        const val = res[key];

        if (isFalsy(val)) {
            //@ts-ignore
            delete res[key]
        }
    })
    return res
}

export const useMount = (cbk: () => void) => useEffect(() => cbk(), []);
/**
 * 
 * @param {值} val 
 * @param {延时:默认1000} delay 
 * @returns  在某段时间内多次变动后最终拿到的值
 */

//防抖函数
//V 泛型，表示传入与返回类型相同
export const useDebounce = <V>(val: V, delay = 1000) => {
    const [tempVal, setTempVal] = useState(val);
    useEffect(() => {
        //每次在val变化之后，设置一个定时器
        const timeout = setTimeout(() => {
            setTempVal(val)
        }, delay);
        return () => clearTimeout(timeout)
    }, [val, delay])
    return tempVal;
}
