const express = require('express')
const app = express()
const path = require('path')
// 定义端口  尝试从环境变量中获取端口号，如果没有设置，则默认使用 3500 作为端口
const PORT = process.env.PORT || 3500

app.get('^/$|/index(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', { root: __dirname })
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, 'new-page.html')
})

// Router handlers
app.get('/hello(.html)?', (req, res, next) => {
    console.log('尝试加载hello.html')
    next()  // 跳转到下一个中间件函数
}, (req, res) => {
    res.send('Hello World!')
})

// Chaining route handlers
const one = (req, res, next) => {
    console.log('one')
    next()
}

const two = (req, res, next) => {
    console.log('two')
    next()
}

const three = (req, res) => {
    console.log('three')
    res.send('Finished!')
}

app.get('/chain(.html)?', [one, two, three])


app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))







