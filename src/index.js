const axios = require('axios').default

async function getUserBadges(userId, token) {
    try {
        return (
            await axios.get(`https://discord.com/api/users/${userId}`, {
                headers: { Authorization: token },
            })
        ).data
    } catch (_) {
        return { public_flags: -1 }
    }
}

function parseBadges(flags) {
    const badges = []
    if (flags >= 1 << 9) badges.push('Early Supporter')
    if (flags >= 1 << 17) badges.push('Early Verified Bot Developer')
    return badges
}

module.exports = {
    getUserBadges,
    parseBadges,
}
