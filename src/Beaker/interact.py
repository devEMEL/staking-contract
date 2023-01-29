import time
from staking import Stake
from beaker.client import ApplicationClient
from beaker import sandbox
from beaker.client.api_providers import Network, AlgoNode
from algosdk.atomic_transaction_composer import TransactionWithSigner
from algosdk.future.transaction import AssetTransferTxn
from beaker import Application, AccountStateValue, opt_in, external, create


client = AlgoNode(Network.TestNet).algod()
# client = sandbox.get_algod_client()

accts = sandbox.get_accounts()

creator_acct = accts.pop()
print(creator_acct.address)
acct1 = accts.pop()
print(acct1.address)

app=Stake()
app_client = ApplicationClient(client=client, app=app, signer=creator_acct.signer)


def test():
    app_id, app_addr, tx_id = app_client.create()
    print(f"App created with ID: {app_id}, and address: {app_addr} and signed with tx id: {tx_id}")

    app_client.fund(amt=1_000_000, addr=app_addr)
    app_client.fund(amt=1_000_000, addr=acct1.address)

    acct1_client = app_client.prepare(signer=acct1.signer)

    app_client.call(app.optin_asset, asset_id=156293328)

    acct1_client.opt_in()
    txn = TransactionWithSigner(txn=AssetTransferTxn(sender=acct1.address, sp=client.suggested_params(), receiver=app_addr, amt=1, index=156293328), signer=acct1.signer)
    asset_id = acct1_client.call(app.stake, app=156293058, key="asset_id", txn=txn)
    print(asset_id.return_value)
    print(acct1_client.get_account_state())
    print(app_client.get_application_state())

    time.sleep(180)

    acct1_client.call(app.unstake, time=180, asset_id=156293328)
    print(acct1_client.get_account_state())


test()
