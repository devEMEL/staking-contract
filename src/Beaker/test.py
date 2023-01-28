from staking import Stake
from beaker.client import ApplicationClient
from beaker import sandbox
from beaker.client.api_providers import Network, AlgoNode
from algosdk.atomic_transaction_composer import TransactionWithSigner
from algosdk.future.transaction import AssetTransferTxn


client = AlgoNode(Network.TestNet).algod()

accts = sandbox.get_accounts()

creator_acct = accts.pop()


app=Stake()
app_client = ApplicationClient(client=client, app=app, signer=creator_acct.signer)



def test():
    app_id, app_addr, tx_id = app_client.create()
    print(f"App created with ID: {app_id}, and address: {app_addr} and signed with tx id: {tx_id}")

    # txn = TransactionWithSigner(txn=AssetTransferTxn(sender="", sp=client.suggested_params(), receiver=, amt, index), signer=creator_acct.signer)
    print(app_client.call(app.stake, app=156272915, key="asset_id").return_value)


test()
