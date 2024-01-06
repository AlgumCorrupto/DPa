const jobJson = require('../jobs.json')

module.exports = {
    get(dept) {
        if(jobJson[dept]) {
            return jobJson[dept];
        }
        else {
            return null;
        }
    },
    makeQuery(jobs) {
        let query = ''
        for(let i = 0; i < jobs.length; i++) {
            if(i == 0) {
                query += `tracker = 'Job${jobs[i]}' OR `
            } else if(i == (jobs.length - 1)) {
                query += `tracker = 'Job${jobs[i]}'`
            } else {
                query +=  `tracker = 'Job${jobs[i]}' OR `
            }
        }

        return query
    }
}