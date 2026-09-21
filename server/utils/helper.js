

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))


const isRetryableStatus = (status) => {
    return [429, 500, 502, 503, 504].includes(status)
}

module.exports = {
    sleep,
    isRetryableStatus
}