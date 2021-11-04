const { getUserBadges, parseBadges } = require('./src/index'),
    { token, findings_output } = require('./config.json'),
    { Client } = require('discord.js'),
    { writeFileSync } = require('fs'),
    client = new Client({ fetchAllMembers: true })

async function main() {
    try {
        await client.login(token)
    } catch (e) {
        throw e
    }

    const users = client.users.array(),
        findings = {}

    for (let i = 0; i < users.length; i++) {
        const { tag, id } = users[i]
        if (id === '1') continue

        const { public_flags } = await getUserBadges(id, client.token),
            badges = parseBadges(public_flags)

        if (badges.length)
            findings[id] = {
                tag,
                badges,
            }
    }

    try {
        writeFileSync(findings_output, JSON.stringify(findings))
    } catch (e) {
        throw e
    }

    return `Findings have been write at "${findings_output}".`
}

main().then(console.log).catch(console.error).finally(client.destroy)
