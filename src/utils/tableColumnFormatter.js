/**
 * 列表数据格式转换
 */
class ColumnFormatter {
    /**
     * 获取状态显示文字
     */
    getStatusText(row) {
        switch (row.status) {
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
    getTypeText(row) {
        switch (row.type) {
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

    /**
     * 含税金额处理
     */
    getTaxIncludedAmountText(row) {
        return row.taxIncludedAmount + ' 元'
    }

    /**
     * 不含税金额处理
     */
    getUnTaxIncludedAmountText(row) {
        return row.unTaxIncludedAmount + ' 元'
    }

    /**
     * 处理空值
     */
    handleProjcetNameEmpty(row) {
        return row.projectName == "undefined" || row.projectName == null || row.projectName == '' ? '--' : row.projectName
    }

    /**
     * 处理空值
     */
    handleReceiveTimeEmpty(row) {
        return row.receiveTime == "undefined" || row.receiveTime == null || row.receiveTime == '' ? '--' : row.receiveTime
    }

    /**
     * 处理空值
     */
    handleReturnReasonEmpty(row) {
        return row.returnReason == "undefined" || row.returnReason == null || row.returnReason == '' ? '--' : row.returnReason
    }
}

export default new ColumnFormatter()