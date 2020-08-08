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
            { text: '术语表', link: '/glossary.html' },
            { text: '更新日志', link: '/changelog.html' },
            { text: '旧文档', link: '/legacy/' },
        ],
        sidebar: {
            '/specs/': [
                ['/specs/', '介绍'],
                {
                    title: '通信',
                    path: '/specs/communication/',
                    collapsable: false,
                    children: [
                        '/specs/communication/http',
                        '/specs/communication/ws',
                        '/specs/communication/ws-reverse',
                    ]
                },
                {
                    title: 'Action',
                    path: '/specs/action/',
                    collapsable: false,
                    children: [
                        '/specs/action/public',
                        '/specs/action/hidden',
                        '/specs/action/experimental',
                    ]
                },
                {
                    title: '事件',
                    path: '/specs/event/',
                    collapsable: false,
                    children: [
                        '/specs/event/message',
                        '/specs/event/notice',
                        '/specs/event/request',
                        '/specs/event/meta',
                    ]
                },
            ],
            '/legacy/': [
                {
                    title: '旧文档',
                    path: '/legacy/',
                    collapsable: false,
                    children: [
                        '/legacy/Home',
                        '/legacy/Docker',
                        '/legacy/Configuration',
                        '/legacy/CommunicationMethods',
                        '/legacy/API',
                        '/legacy/WebSocketAPI',
                        '/legacy/Post',
                        '/legacy/EventFilter',
                        '/legacy/Message',
                        '/legacy/CQCode',
                    ]
                },
            ]
        },
    }
}