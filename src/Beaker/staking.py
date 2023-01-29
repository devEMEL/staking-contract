from pyteal import *
from typing import Final
from beaker import Application, AccountStateValue, ApplicationStateValue, external, opt_in, create, Authorize


class Stake(Application):
    interest_per_sec: Final[ApplicationStateValue] = ApplicationStateValue(
        stack_type=TealType.uint64,
        default=Int(1)
    )
    stake_amount: Final[AccountStateValue] = AccountStateValue(
        stack_type=TealType.uint64
    )
    stake_timestamp: Final[AccountStateValue] = AccountStateValue(
        stack_type=TealType.uint64
    )
    is_staking: Final[AccountStateValue] = AccountStateValue(
        stack_type=TealType.uint64,
        default=Int(0)
    )

    FEE = Int(1_000)

    @create
    def create(self):
        return self.initialize_application_state()

    @opt_in
    def optin(self):
        return self.initialize_account_state()

    @external(authorize=Authorize.only(Global.creator_address()))
    def optin_asset(
        self,
        asset_id: abi.Asset # type: ignore[assignment]
    ):
        return Seq(
            InnerTxnBuilder.Execute({
                TxnField.type_enum: TxnType.AssetTransfer,
                TxnField.xfer_asset: asset_id.asset_id(),
                TxnField.asset_amount: Int(0),
                TxnField.asset_receiver: self.address,
                TxnField.fee: self.FEE
            })
        )

    @external
    def stake(
        self,
        txn: abi.AssetTransferTransaction,
        key: abi.String,
        app: abi.Application # type: ignore[assignment]
    ):
        return Seq(
            (asset_id := App.globalGetEx(app=app.application_id(), key=key.get())),
            Assert(asset_id.hasValue()),
            Assert(self.is_staking == Int(0)),
            Assert(
                And(
                    txn.get().type_enum() == TxnType.AssetTransfer,
                    txn.get().asset_amount() > Int(0),
                    txn.get().asset_receiver() == self.address,
                    txn.get().xfer_asset() == asset_id.value()
                )
            ),
            self.is_staking.set(Int(1)),
            self.stake_amount.set(txn.get().asset_amount()),
            self.stake_timestamp.set(Global.latest_timestamp())
        )

    @external
    def unstake(
        self,
        time: abi.Uint64,
        asset_id: abi.Asset # type: ignore[assignment]
    ):
        return Seq(
            Assert(self.is_staking == Int(1)),
            Assert(Global.latest_timestamp() >= (self.stake_timestamp + time.get())),
            (reward_amount := abi.Uint64()).set(self.stake_amount + ((Global.latest_timestamp() - self.stake_timestamp) * self.interest_per_sec)),
            InnerTxnBuilder.Execute({
                TxnField.type_enum: TxnType.AssetTransfer,
                TxnField.xfer_asset: asset_id.asset_id(),
                TxnField.asset_amount: reward_amount.get(),
                TxnField.asset_receiver: Txn.sender(),
                TxnField.fee: self.FEE
            }),
            self.is_staking.set(Int(0))
        )


Stake().dump()
