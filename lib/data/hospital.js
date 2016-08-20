class Hospital {
    constructor() {
        this._code = "";
        this._name = "";
        this._alias = "";
        this._phone = [];
        this._fax = [];
        this._hotline = "";
        this._website = "";
        this._registrationUrl = "";
        this._email = [];
        this._address = "";
        this._country = "";
        this._city = "";
        this._institution = "";
    }

    
    set Code(val) {
        this._code = val;
    }
    get Code() {
        return this._code;
    }

    set Name(val) {
        this._name = val;
    }
    get Name() {
        return this._name;
    }

    set Alias(val) {
        this._alias = val;
    }
    get Alias() {
        return this._alias;
    }

    set Phone(val) {
        this._phone = val;
    }
    get Phone() {
        return this._phone;
    }

    set Fax(val) {
        this._fax = val;
    }
    get Fax() {
        return this._fax;
    }

    set Hotline(val) {
        this._hotline = val;
    }
    get Hotline() {
        return this._hotline;
    }

    set Website(val) {
        this._website = val;
    }
    get Website() {
        return this._website;
    }

    set RegistrationUrl(val) {
        this._registrationUrl = val;
    }
    get RegistrationUrl() {
        return this._registrationUrl;
    }

    set Email(val) {
        this._email = val;
    }
    get Email() {
        return this._email;
    }

    set Address(val) {
        this._address = val;
    }
    get Address() {
        return this._address;
    }

    set Country(val) {
        this._country = val;
    }
    get Country() {
        return this._country;
    }

    set City(val) {
        this._city = val;
    }
    get City() {
        return this._city;
    }

    set Institution(val) {
        this._institution = val;
    }
    get Institution() {
        return this._institution;
    }
}

module.exports = Hospital;