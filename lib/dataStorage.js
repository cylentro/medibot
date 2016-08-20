class DataStorage {
    constructor(timeStamp) {
        this.hospitals = new Set;
        this.schedules = new Set;
        this.timeStamp = timeStamp || new Date();
    }

    addHospital(hospitalInfo) {
        if (!this.hospitals.has(hospitalInfo))
            this.hospitals.add(hospitalInfo);
    }

    addSchedule(scheduleInfo) {
        if (!this.schedules.has(scheduleInfo))
            this.schedules.add(scheduleInfo);
    }
}

module.exports = DataStorage;