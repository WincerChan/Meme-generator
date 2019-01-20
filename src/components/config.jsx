const getConfig = () => {
    return [
        require("../pages/woshuode").config,
        require("../pages/wangjingze").config,
        require("../pages/weisuoyuwei").config,
        require("../pages/lianliankan").config,
        require("../pages/shuifandui").config,
        require("../pages/dagong").config
    ]
}
// const configs = Object.values(pages).filter(value => value !== undefined && value.hasOwnProperty("url"));

export default getConfig;