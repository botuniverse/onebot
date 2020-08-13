module.exports = {
    title: 'CQHTTP 标准',
    description: '一个聊天机器人应用接口标准',
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
        '@vuepress/google-analytics': {
            'ga': 'UA-115509121-1'
        },
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
            {
                text: '版本: latest', items: [
                    { text: 'latest', link: '/' },
                    { text: 'v10', link: '/v10/', target: '_blank' },
                ]
            },
            { text: '主页', link: '/' },
            { text: '标准规范', link: '/specs/' },
            { text: '生态', link: '/ecosystem.html' },
            { text: '更新日志', link: '/changelog.html' },
            { text: '旧文档', link: '/legacy/' },
        ],
        sidebar: {
            '/specs/': [
                ['/specs/', '介绍'],
                {
                    title: '通信',
                    collapsable: false,
                    children: [
                        ['/specs/communication/', '通信概述'],
                        '/specs/communication/http',
                        '/specs/communication/http-post',
                        '/specs/communication/ws',
                        '/specs/communication/ws-reverse',
                        '/specs/communication/authorization',
                    ]
                },
                {
                    title: '消息',
                    collapsable: false,
                    children: [
                        ['/specs/message/', '消息概述'],
                        '/specs/message/string',
                        '/specs/message/array',
                        '/specs/message/segment',
                    ]
                },
                {
                    title: 'API',
                    collapsable: false,
                    children: [
                        ['/specs/api/', 'API 概述'],
                        '/specs/api/public',
                        '/specs/api/hidden',
                    ]
                },
                {
                    title: '事件',
                    collapsable: false,
                    children: [
                        ['/specs/event/', '事件概述'],
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