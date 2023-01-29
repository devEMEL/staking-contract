import algosdk from "algosdk";
import * as bkr from "beaker-ts";
export class Stake extends bkr.ApplicationClient {
    desc: string = "";
    override appSchema: bkr.Schema = { declared: { interest_per_sec: { type: bkr.AVMType.uint64, key: "interest_per_sec", desc: "", static: false } }, reserved: {} };
    override acctSchema: bkr.Schema = { declared: { stake_amount: { type: bkr.AVMType.uint64, key: "stake_amount", desc: "", static: false }, stake_timestamp: { type: bkr.AVMType.uint64, key: "stake_timestamp", desc: "", static: false }, is_staking: { type: bkr.AVMType.uint64, key: "is_staking", desc: "", static: false } }, reserved: {} };
    override approvalProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDgKaW50Y2Jsb2NrIDAgMSA0IDEwMDAKYnl0ZWNibG9jayAweDY5NzM1ZjczNzQ2MTZiNjk2ZTY3IDB4NzM3NDYxNmI2NTVmNzQ2OTZkNjU3Mzc0NjE2ZDcwIDB4NzM3NDYxNmI2NTVmNjE2ZDZmNzU2ZTc0IDB4Njk2ZTc0NjU3MjY1NzM3NDVmNzA2NTcyNWY3MzY1NjMKdHhuIE51bUFwcEFyZ3MKaW50Y18wIC8vIDAKPT0KYm56IG1haW5fbDgKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHhlMDBiNzhhOSAvLyAib3B0aW5fYXNzZXQoYXNzZXQpdm9pZCIKPT0KYm56IG1haW5fbDcKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHhhNjk1M2ZlYSAvLyAic3Rha2UoYXhmZXIsc3RyaW5nLGFwcGxpY2F0aW9uKXVpbnQ2NCIKPT0KYm56IG1haW5fbDYKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHgzYWM4NTNiNCAvLyAidW5zdGFrZSh1aW50NjQsYXNzZXQpdm9pZCIKPT0KYm56IG1haW5fbDUKZXJyCm1haW5fbDU6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKYnRvaQpzdG9yZSA5CnR4bmEgQXBwbGljYXRpb25BcmdzIDIKaW50Y18wIC8vIDAKZ2V0Ynl0ZQpzdG9yZSAxMApsb2FkIDkKbG9hZCAxMApjYWxsc3ViIHVuc3Rha2VfNAppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sNjoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQpzdG9yZSAxCnR4bmEgQXBwbGljYXRpb25BcmdzIDIKaW50Y18wIC8vIDAKZ2V0Ynl0ZQpzdG9yZSAyCnR4biBHcm91cEluZGV4CmludGNfMSAvLyAxCi0Kc3RvcmUgMApsb2FkIDAKZ3R4bnMgVHlwZUVudW0KaW50Y18yIC8vIGF4ZmVyCj09CmFzc2VydApsb2FkIDAKbG9hZCAxCmxvYWQgMgpjYWxsc3ViIHN0YWtlXzMKc3RvcmUgMwpwdXNoYnl0ZXMgMHgxNTFmN2M3NSAvLyAweDE1MWY3Yzc1CmxvYWQgMwppdG9iCmNvbmNhdApsb2cKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDc6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKaW50Y18wIC8vIDAKZ2V0Ynl0ZQpjYWxsc3ViIG9wdGluYXNzZXRfMgppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sODoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQpibnogbWFpbl9sMTIKdHhuIE9uQ29tcGxldGlvbgppbnRjXzEgLy8gT3B0SW4KPT0KYm56IG1haW5fbDExCmVycgptYWluX2wxMToKdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KYXNzZXJ0CmNhbGxzdWIgb3B0aW5fMQppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sMTI6CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCj09CmFzc2VydApjYWxsc3ViIGNyZWF0ZV8wCmludGNfMSAvLyAxCnJldHVybgoKLy8gY3JlYXRlCmNyZWF0ZV8wOgpieXRlY18zIC8vICJpbnRlcmVzdF9wZXJfc2VjIgppbnRjXzEgLy8gMQphcHBfZ2xvYmFsX3B1dApyZXRzdWIKCi8vIG9wdGluCm9wdGluXzE6CnR4biBTZW5kZXIKYnl0ZWNfMiAvLyAic3Rha2VfYW1vdW50IgppbnRjXzAgLy8gMAphcHBfbG9jYWxfcHV0CnR4biBTZW5kZXIKYnl0ZWNfMSAvLyAic3Rha2VfdGltZXN0YW1wIgppbnRjXzAgLy8gMAphcHBfbG9jYWxfcHV0CnR4biBTZW5kZXIKYnl0ZWNfMCAvLyAiaXNfc3Rha2luZyIKaW50Y18wIC8vIDAKYXBwX2xvY2FsX3B1dApyZXRzdWIKCi8vIG9wdGluX2Fzc2V0Cm9wdGluYXNzZXRfMjoKc3RvcmUgMTEKaXR4bl9iZWdpbgppbnRjXzIgLy8gYXhmZXIKaXR4bl9maWVsZCBUeXBlRW51bQpsb2FkIDExCnR4bmFzIEFzc2V0cwppdHhuX2ZpZWxkIFhmZXJBc3NldAppbnRjXzAgLy8gMAppdHhuX2ZpZWxkIEFzc2V0QW1vdW50Cmdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCml0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgppbnRjXzMgLy8gMTAwMAppdHhuX2ZpZWxkIEZlZQppdHhuX3N1Ym1pdApyZXRzdWIKCi8vIHN0YWtlCnN0YWtlXzM6CnN0b3JlIDYKc3RvcmUgNQpzdG9yZSA0CmxvYWQgNgp0eG5hcyBBcHBsaWNhdGlvbnMKbG9hZCA1CmV4dHJhY3QgMiAwCmFwcF9nbG9iYWxfZ2V0X2V4CnN0b3JlIDgKc3RvcmUgNwpsb2FkIDgKYXNzZXJ0CnR4biBTZW5kZXIKYnl0ZWNfMCAvLyAiaXNfc3Rha2luZyIKYXBwX2xvY2FsX2dldAppbnRjXzAgLy8gMAo9PQphc3NlcnQKbG9hZCA0Cmd0eG5zIFR5cGVFbnVtCmludGNfMiAvLyBheGZlcgo9PQpsb2FkIDQKZ3R4bnMgQXNzZXRBbW91bnQKaW50Y18wIC8vIDAKPgomJgpsb2FkIDQKZ3R4bnMgQXNzZXRSZWNlaXZlcgpnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwo9PQomJgpsb2FkIDQKZ3R4bnMgWGZlckFzc2V0CmxvYWQgNwo9PQomJgphc3NlcnQKdHhuIFNlbmRlcgpieXRlY18wIC8vICJpc19zdGFraW5nIgppbnRjXzEgLy8gMQphcHBfbG9jYWxfcHV0CnR4biBTZW5kZXIKYnl0ZWNfMiAvLyAic3Rha2VfYW1vdW50Igpsb2FkIDQKZ3R4bnMgQXNzZXRBbW91bnQKYXBwX2xvY2FsX3B1dAp0eG4gU2VuZGVyCmJ5dGVjXzEgLy8gInN0YWtlX3RpbWVzdGFtcCIKZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAphcHBfbG9jYWxfcHV0CmxvYWQgNwpyZXRzdWIKCi8vIHVuc3Rha2UKdW5zdGFrZV80OgpzdG9yZSAxMwpzdG9yZSAxMgp0eG4gU2VuZGVyCmJ5dGVjXzAgLy8gImlzX3N0YWtpbmciCmFwcF9sb2NhbF9nZXQKaW50Y18xIC8vIDEKPT0KYXNzZXJ0Cmdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKdHhuIFNlbmRlcgpieXRlY18xIC8vICJzdGFrZV90aW1lc3RhbXAiCmFwcF9sb2NhbF9nZXQKbG9hZCAxMgorCj49CmFzc2VydAp0eG4gU2VuZGVyCmJ5dGVjXzIgLy8gInN0YWtlX2Ftb3VudCIKYXBwX2xvY2FsX2dldApnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCnR4biBTZW5kZXIKYnl0ZWNfMSAvLyAic3Rha2VfdGltZXN0YW1wIgphcHBfbG9jYWxfZ2V0Ci0KYnl0ZWNfMyAvLyAiaW50ZXJlc3RfcGVyX3NlYyIKYXBwX2dsb2JhbF9nZXQKKgorCnN0b3JlIDE0Cml0eG5fYmVnaW4KaW50Y18yIC8vIGF4ZmVyCml0eG5fZmllbGQgVHlwZUVudW0KbG9hZCAxMwp0eG5hcyBBc3NldHMKaXR4bl9maWVsZCBYZmVyQXNzZXQKbG9hZCAxNAppdHhuX2ZpZWxkIEFzc2V0QW1vdW50CnR4biBTZW5kZXIKaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCmludGNfMyAvLyAxMDAwCml0eG5fZmllbGQgRmVlCml0eG5fc3VibWl0CnR4biBTZW5kZXIKYnl0ZWNfMCAvLyAiaXNfc3Rha2luZyIKaW50Y18wIC8vIDAKYXBwX2xvY2FsX3B1dApyZXRzdWI=";
    override clearProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDgKcHVzaGludCAwIC8vIDAKcmV0dXJu";
    override methods: algosdk.ABIMethod[] = [
        new algosdk.ABIMethod({ name: "optin_asset", desc: "", args: [{ type: "asset", name: "asset_id", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "stake", desc: "", args: [{ type: "axfer", name: "txn", desc: "" }, { type: "string", name: "key", desc: "" }, { type: "application", name: "app", desc: "" }], returns: { type: "uint64", desc: "" } }),
        new algosdk.ABIMethod({ name: "unstake", desc: "", args: [{ type: "uint64", name: "time", desc: "" }, { type: "asset", name: "asset_id", desc: "" }], returns: { type: "void", desc: "" } })
    ];
    async optin_asset(args: {
        asset_id: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.optin_asset({ asset_id: args.asset_id }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async stake(args: {
        txn: algosdk.TransactionWithSigner | algosdk.Transaction;
        key: string;
        app: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<bigint>> {
        const result = await this.execute(await this.compose.stake({ txn: args.txn, key: args.key, app: args.app }, txnParams));
        return new bkr.ABIResult<bigint>(result, result.returnValue as bigint);
    }
    async unstake(args: {
        time: bigint;
        asset_id: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.unstake({ time: args.time, asset_id: args.asset_id }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    compose = {
        optin_asset: async (args: {
            asset_id: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "optin_asset"), { asset_id: args.asset_id }, txnParams, atc);
        },
        stake: async (args: {
            txn: algosdk.TransactionWithSigner | algosdk.Transaction;
            key: string;
            app: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "stake"), { txn: args.txn, key: args.key, app: args.app }, txnParams, atc);
        },
        unstake: async (args: {
            time: bigint;
            asset_id: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "unstake"), { time: args.time, asset_id: args.asset_id }, txnParams, atc);
        }
    };
}
