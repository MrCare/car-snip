class Util {
    private dict = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz*^".split("")

    public encode10to64 = (ori: number):string => {
        let partA = parseInt(String(ori));
        let partB = ori - partA
        return this.int10to64(partA) + "." + this.decimal10to64(partB)
    }

    public decode64to10 = (ori: string) => {
        try {
            let [partA, partB] = ori.split('.');
            if (partA.includes("-")){
                return "-" + this.int64to10(partA) + this.decimal64to10(partB)
            }
            return this.int64to10(partA) + this.decimal64to10(partB)
        }
        catch(e){
            throw('输入格式有误')
        }
    }

    /**
     * 整数转64进制
     * @param ori 整数
     * @returns 
     */
    private int10to64 = (ori: number):string => {
        let int = Math.abs(parseInt(String(ori)));
        let rst = '';
        while (int !== 0) {
            rst = this.dict[int % 64] + rst;
            int = parseInt(String(int / 64));
        }
        return rst ? ori < 0 ? "-" + rst : rst : this.dict[int];
    }

    /**
     * 小数转64进制
     * @param ori 小数
     * @returns 
     */
    private decimal10to64 = (ori: number):string => {
        let decimal = ori - parseInt(String(ori));
        let rst = '';
        for (let i = 0; i < 12; i++){
            let partInt = parseInt(String(decimal * 64));
            rst = rst + this.dict[partInt];
            decimal = decimal * 64 - partInt;
        }
        return rst
    }

    /**
     * 64进制整数转10进制
     * @param ori 64进制整数
     * @returns 
     */
    private int64to10 = (ori: string):number => {
        let rst:number = 0;
        ori.split("").reverse().forEach((item, i) => {
            rst += this.dict.indexOf(item) * 64 ** i
        });
        return rst
    }

    private decimal64to10 = (ori: string):number => {
        let rst:number = 0;
        ori.split("").forEach((item, i) => {
            rst += this.dict.indexOf(item) * 64 ** ( -1 * i - 1)
        });
        return rst
    }
}

export default Util
let testArray = [0, 10, 0.1, 0.5, 14135.561, 64];
let rstArray = ["0.000000000000", "A.000000000000", "0.6PcPcPcPcW00", "0.W00000000000", "3St.ZvsoBGu00000"];
let util = new Util();

testArray.forEach(item => {
    console.info(util.encode10to64(item));
});

rstArray.forEach(item => {
    console.info(util.decode64to10(item));
});