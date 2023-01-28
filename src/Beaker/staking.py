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
    def stake(
        self,
        txn: abi.AssetTransferTransaction,
        key: abi.String,
        app: abi.Application, # type: ignore[assignment]
        *,
        output: abi.Uint64
    ):
        return Seq(
            (app_id := App.globalGetEx(app=app.application_id(), key=key.get())),
            Assert(app_id.hasValue()),
            Assert(
                And(
                    self.is_staking == Int(0),
                    txn.get().type_enum() == TxnType.AssetTransfer,
                    txn.get().asset_amount() > Int(0),
                    txn.get().asset_receiver() == self.address,
                    txn.get().xfer_asset() == app_id.value()
                )
            ),
            self.is_staking.set(Int(1)),
            self.stake_amount.set(txn.get().asset_amount()),
            self.stake_timestamp.set(Global.latest_timestamp()),
            output.set(app_id.value())
        )


Stake().dump()
