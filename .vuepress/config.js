module.exports = {
    title: 'CQHTTP 协议',
    description: '一个 QQ 机器人应用接口协议',
    markdown: {
        // lineNumbers: true,
    },
    head: [
        ['link', { rel: 'icon', href: `/logo.png` }],
        ['meta', { name: 'theme-color', content: '#000000' }],
    ],
    plugins: {
        'container': {
            type: 'tree',
            before: '<pre class="tree-container"><code>',
            after: '</code></pre>'
        },
        // '@vuepress/google-analytics': {
        //     'ga': 'UA-115509121-3'
        // },
        '@vuepress/back-to-top': true,
        '@vuepress/medium-zoom': true,
    },
    themeConfig: {
        logo: '/logo.png',
        repo: 'richardchien/cqhttp-protocol',
        lastUpdated: '上次更新',
        editLinks: true,
        editLinkText: '帮助我们改善此页面',
        nav: [
            { text: '主页', link: '/' },
            { text: '协议', link: '/specs/' },
            { text: '更新日志', link: '/changelog.html' },
        ],
        sidebar: {
            '/specs/': [
                ['/specs/', '介绍'],
                {
                    title: '协议',
                    collapsable: false,
                    children: [
                        '/specs/configuration',
                        '/specs/connection',
                        '/specs/api',
                        '/specs/websocket-api',
                        '/specs/event',
                        '/specs/message',
                        '/specs/cqcode',
                    ],
                },
            ],
        },
    }
}