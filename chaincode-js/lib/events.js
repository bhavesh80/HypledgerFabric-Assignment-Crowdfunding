'use strict';

const { Contract } = require('fabric-contract-api');

class Events extends Contract{
    async initLedger(ctx){
        console.info("Here initialize ledger");
    }

    async createEvent(ctx,name,amountRequired,amountReceived,proofDetails,creator,startDate,endDate,donationIds,approvalStatus,organizationDetails){
        const event = {
            Name = name,
            AmountRequired = amountRequired,
            AmountReceived = amountReceived,
            ProofDetails   = proofDetails,
            Creator = creator,
            StartDate = startDate,
            EndDate = endDate,
            DonationIds = donationIds,
            ApprovalStatus = approvalStatus,
            OrganizationDetails = organizationDetails,
        };
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(event)));
        return JSON.stringify(event);
    }

    async ReadEvent(ctx, name) {
        const eventJSON = await ctx.stub.getState(name); // get the asset from chaincode state
        if (!eventJSON || eventJSON.length === 0) {
            throw new Error(`The asset ${name} does not exist`);
        }
        return eventJSON.toString();
    }

    async EventsExists(ctx, name) {
        const eventJSON = await ctx.stub.getState(name);
        return eventJSON && eventJSON.length > 0;
    }

    async GetAllEvents(ctx) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: result.value.key, Record: record });
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }

}


module.exports = Events;
