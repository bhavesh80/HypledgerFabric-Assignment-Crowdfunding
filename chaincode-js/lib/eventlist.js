/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Utility class for collections of ledger states --  a state list
const StateList = require('./../ledger-api/statelist.js');

const Events = require('./event.js');

class PaperList extends StateList {

    constructor(ctx) {
        super(ctx, 'org.crowdfunding.events');
        this.use(Events);
    }

    async addEvent(paper) {
        return this.addState(paper);
    }

    async getEvent(paperKey) {
        return this.getState(paperKey);
    }

    async updateEvent(paper) {
        return this.updateState(paper);
    }
}


module.exports = EventList;
