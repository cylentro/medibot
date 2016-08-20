class ConnectorBridge {
    constructor(dataStorage) {
        this.dataStorage = dataStorage;
    }

    registerHospital(hospitalInfo) {
        this.dataStorage.addHospital(hospitalInfo);
    }

    registerSchedule(scheduleInfo) {
        this.dataStorage.addSchedule(scheduleInfo);
    }

    init() { }
    loadHospital() { }
    loadSchedule() { }
    // loadSchedule(doctorName) { }
    // loadschedule(doctorSpeciality) { }
}

module.exports = ConnectorBridge;