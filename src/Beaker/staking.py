from pyteal import *
from typing import Final
from beaker import Application, AccountStateValue, ApplicationStateValue, external


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

    @external
    def stake(self, txn: abi.AssetTransferTransaction, app: abi.Application, key: abi.String):
        return Seq(
            Assert(
                And(
                    self.is_staking == Int(0),
                    txn.get().asset_amount() > Int(0),
                    txn.get().asset_receiver() == self.address,
                    txn.get().xfer_asset() == App.globalGetEx(app=app.application_id(), key=key.get())
                )
            ),
            self.is_staking.set(Int(1)),
            self.stake_amount.set(txn.get().asset_amount()),
            self.stake_timestamp.set(Global.latest_timestamp())
        )

