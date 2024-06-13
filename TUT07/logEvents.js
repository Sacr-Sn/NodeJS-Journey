// nodemon 会自动找到index.js并执行
// index.js 更新并保存后，nodemon 会自动重新执行index.js 

const { format } = require('date-fns')
const { v4: uuid } = require('uuid')  // 导入v4版本uuid

const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvents = async (message, fileName) => {
    const dateTime = `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n\n`
    console.log(logItem)
    try {
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, 'logs', fileName), logItem)
    } catch (err) {
        console.log(err)
    }
}

module.exports = logEvents