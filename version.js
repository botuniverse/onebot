#!/usr/bin/env node

const fs = require('fs')

const checkEnv = require('vuepress/lib/checkEnv')
const { CLI } = require('vuepress/lib/util')
const { wrapCommand } = require('vuepress/lib/util')
const { build } = require('@vuepress/core')
const { path, logger } = require('@vuepress/shared-utils')

let siteConfig = require('./.vuepress/config')

let options = {
    theme: '@vuepress/default',
    siteConfig,
}

CLI({
    async beforeParse(cli) {
        const pkg = require('@vuepress/core/package.json')
        checkEnv(pkg)

        cli
            .command('release [version]', 'release a version')
            .action((version) => {
                logger.info('Releasing version:', version)
                options.siteConfig.base = `/${version}/`

                const nav = options.siteConfig.themeConfig.nav
                nav.splice(nav.length - 1, 1)
                for (const navItem of nav) {
                    if (navItem.text.startsWith('版本')) {
                        navItem.text = `版本: ${version}`
                        navItem.items[0].text = version
                        navItem.items.splice(0, 0, { text: 'latest', link: '/', target: '_blank' })
                        break
                    }
                }

                logger.info('Updating changelog')
                const changelog = fs.readFileSync('./changelog.md', 'utf8')
                fs.writeFileSync('./changelog.md', changelog.replace('## latest', `## ${version}`))

                logger.info('Updating config.js')
                const configjs = fs.readFileSync('./.vuepress/config.js', 'utf8')
                let lines = configjs.split('\n')
                for (let i = 0; i < lines.length; i++) {
                    if (/text:\s*'latest'/.test(lines[i])) {
                        const spaceNum = lines[i].indexOf('{');
                        lines.splice(i + 1, 0, `${' '.repeat(spaceNum)}{ text: '${version}', link: '${options.siteConfig.base}', target: '_blank' },`)
                        break
                    }
                }
                fs.writeFileSync('./.vuepress/config.js', lines.join('\n'))

                const dest = `./.vuepress/public/${version}`

                logger.info('Building docs for', version)
                wrapCommand(build)({
                    sourceDir: path.resolve('.'),
                    dest,
                    ...options,
                }).then(() => {
                    fs.rmdirSync(`${dest}/legacy`, { recursive: true })
                })
            })
    },
})
