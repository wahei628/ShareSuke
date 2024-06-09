class UserSchedule < ApplicationRecord
  # 中間モデル

  # UserSchedule ∋+--④--++ User
  #              ∋+--⑤--++ Schedule
  belongs_to :user
  belongs_to :schedule

  # ユニークバリデーション
  validates :user_id, uniqueness: { scope: :schedule_id }
end
