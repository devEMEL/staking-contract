from pyteal import *
from staking import Stake
from beaker.client import ApplicationClient
from beaker import sandbox
from beaker.client.api_providers import Network, AlgoNode
from algosdk.atomic_transaction_composer import TransactionWithSigner
from algosdk.future.transaction import AssetTransferTxn
from beaker import Application, AccountStateValue, opt_in, external, create

client = AlgoNode(Network.TestNet).algod()

accts = sandbox.get_accounts()

creator_acct = accts.pop()
acct1 = accts[0]

app=Stake()
app_client = ApplicationClient(client=client, app=app, signer=creator_acct.signer)


def test():
    app_id, app_addr, tx_id = app_client.create()
    print(f"App created with ID: {app_id}, and address: {app_addr} and signed with tx id: {tx_id}")

    app_client.fund(amt=1_000_000, addr=app_addr)
    app_client.fund(amt=1_000_000, addr=acct1.address)

    acct1_client = app_client.prepare(signer=acct1.signer)

    txn = TransactionWithSigner(txn=AssetTransferTxn(sender=acct1.address, sp=client.suggested_params(), receiver=app_addr, amt=5, index=156273400), signer=acct1.signer)
    asset_id = acct1_client.call(app.stake, app=156272915, key="asset_id", txn=txn)
    print(asset_id.return_value)
    print(acct1_client.get_account_state())


test()
