class Schedule < ApplicationRecord
  # Schedule ∋o--③--++ Event
  belongs_to :event

  # Schedule ++--⑤--+∈ UserSchedule ∋+--④--++ User
  has_many :user_schedules, dependent: :destroy
  has_many :user, through: :user_schedules
end
