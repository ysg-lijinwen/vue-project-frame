class BisUtil {
    /**
     * 获取状态显示文字
     */
    getStatusText(status) {
        switch (status) {
            case 0: {
                return '已提交'
            }
            case 1: {
                return '已接收'
            }
            case 2: {
                return '已退回'
            }
            default: {
                return '未知'
            }
        }
    }
    /**
     * 01：增值税专用发票；04：增值税普通发票；10：增值税电子普通发票；
     */
    getTypeText(type) {
        console.log(type)
        switch (type) {
            case "01": {
                return '增值税专用发票'
            }
            case "04": {
                return '增值税普通发票'
            }
            case "10": {
                return '增值税电子普通发票'
            }
            default: {
                return '未知'
            }
        }
    }
}
export default new BisUtil()