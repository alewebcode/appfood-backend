"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    render: function (company) {
        return {
            id: company.id,
            name: company.name,
            logo: "http://192.168.0.102:3333/uploads/" + company.logo,
            trading_name: company.trading_name,
            cnpj: company.cnpj,
            state_registration: company.state_registration,
            zip_code: company.zip_code,
            number: company.number,
            street: company.street,
            complement: company.complement,
            neighborhood: company.neighborhood,
            city: company.city,
            state: company.state,
            phone: company.phone,
            email: company.email,
            delivery: company.delivery,
            pickup_in_place: company.pickup_in_place,
            company_indication: company.company_indication,
            segment: company.segment
        };
    },
    renderMany: function (companies) {
        var _this = this;
        return companies.map(function (company) { return _this.render(company); });
    }
};
