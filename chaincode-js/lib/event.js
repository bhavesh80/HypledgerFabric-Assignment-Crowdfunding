/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class Events extends Contract {

    async InitLedger(ctx) {
        const assets = [
            {
            },
        ];

        for (const asset of assets) {
            asset.docType = 'asset';
            await ctx.stub.putState(asset.ID, Buffer.from(JSON.stringify(asset)));
            console.info(`Asset ${asset.ID} initialized`);
        }
    }

    // CreateAsset issues a new asset to the world state with given details.
    async CreateEvent(ctx, id, name, amountRequired,amountReceived,
          proofDetails,CreatedBy,duration,donationIds,approvalStatus,organizationDetails) {
        const asset = {
            ID: id,
            Name : name,
            AmountRequired : amountRequired,
            AmountReceived : amountReceived,
            ProofDetails   : proofDetails,
            CreatedBy      : CreatedBy,
            Duration       : duration,
            DonationIds    : donationIds,
            ApprovalStatus : approvalStatus,
            OrganizationDetails : organizationDetails,
        };
        ctx.stub.putState(id, Buffer.from(JSON.stringify(asset)));
        return JSON.stringify(asset);
    }

    async ReadEvent(ctx, id) {
        const assetJSON = await ctx.stub.getState(id); // get the event from chaincode state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return assetJSON.toString();
    }

    // UpdateAsset updates an existing asset in the world state with provided parameters.
    async approveCause(ctx, id, approvalStatus) {
        const exists = await this.AssetExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }

        // overwriting original asset with new asset
        const updatedAsset = {
            ID: id,
            ApprovalStatus: approvalStatus,
        };
        return ctx.stub.putState(id, Buffer.from(JSON.stringify(updatedAsset)));
    }

    // EventExists returns true when evennt/cause with given ID exists in world state.
    async EventExists(ctx, id) {
        const assetJSON = await ctx.stub.getState(id);
        return assetJSON && assetJSON.length > 0;
    }


    // GetAllAssets returns all assets found in the world state.
    async GetAllAssets(ctx) {
    }


}

module.exports = AssetTransfer;
